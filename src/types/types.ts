export type SimpleUser = {
  userId: string;
  fullName: string;
  userImage?: string | null;
  role: {
    name: string;
  } | null;
  department: {
    id: string;
    name: string;
  } | null;
  gender?: "Male" | "Female" | "Other";
};
