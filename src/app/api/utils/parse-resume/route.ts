import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";
import PDFParser from "pdf2json"; // Import the new library

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let rawText = "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // --- CHANGED SECTION START ---
    if (file.type === "application/pdf") {
      const pdfParser = new (PDFParser as any)(null, 1); // 1 = Text only

      // Wrap the parsing in a Promise to await it
      rawText = await new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", (errData: any) =>
          reject(errData.parserError)
        );
        pdfParser.on("pdfParser_dataReady", () => {
          // getRawTextContent() is a helper to get the text string
          resolve(pdfParser.getRawTextContent());
        });

        // pdf2json expects a buffer
        pdfParser.parseBuffer(buffer);
      });
    }
    // --- CHANGED SECTION END ---
    else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // Use Gemini to structure the data
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
      Extract the following information from this resume text and return it strictly as a JSON object:
      - fullName
      - email
      - contactNumber
      - city
      - country
      - gender
      - Date of Birth


      Resume text:
      ${rawText}
    `;

    const result = await model.generateContent(prompt);
    console.log(result);
    const response = await result.response;
    const textResponse = response.text();

    // Clean up markdown code blocks if Gemini adds them
    const jsonString = textResponse.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(jsonString);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("PARSE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
