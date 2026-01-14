// --- CNIC helpers ---
export const onlyDigits = (v: string) => v.replace(/\D/g, "");

export const formatCNIC = (v: string) => {
  const digits = onlyDigits(v).slice(0, 13); // 13 digits
  const p1 = digits.slice(0, 5);
  const p2 = digits.slice(5, 12);
  const p3 = digits.slice(12, 13);
  let out = p1;
  if (p2) out += `-${p2}`;
  if (p3) out += `-${p3}`;
  return out;
};

export const cnicDigitsCount = (v: string) => onlyDigits(v).length;

// --- Phone helpers ---
export type CountryPhone = { iso2: string; name: string; dial: string };

export const COUNTRIES: CountryPhone[] = [
  { iso2: "PK", name: "Pakistan", dial: "+92" },
  { iso2: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso2: "AE", name: "UAE", dial: "+971" },
];

export const guessDefaultCountry = (): CountryPhone => {
  // 1) Browser language hint (e.g., en-PK)
  const lang = typeof navigator !== "undefined" ? navigator.language : "";
  const region = lang.includes("-") ? lang.split("-")[1].toUpperCase() : "";

  const fromRegion = COUNTRIES.find((c) => c.iso2 === region);
  if (fromRegion) return fromRegion;

  // 2) Timezone hint (best-effort, not perfect)
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";

  if (tz.includes("Karachi")) return COUNTRIES.find((c) => c.iso2 === "PK")!;
  if (tz.includes("Dubai")) return COUNTRIES.find((c) => c.iso2 === "AE")!;
  if (tz.includes("Riyadh")) return COUNTRIES.find((c) => c.iso2 === "SA")!;

  // fallback
  return COUNTRIES.find((c) => c.iso2 === "PK")!;
};
