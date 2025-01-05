import { DefaultSession } from "next-auth";

export type UserRole = "Admin" | "Inspecteur" | "Manager";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: UserRole;
      firstName?: string;
      lastName?: string;
      badge?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

export type Part = {
  id: string;
  name: string;
  status: string;
  severity: "low" | "medium" | "high" | "critical";
  description?: string;
  category?: string;
  icon?: string;
};

export type Vehicle = {
  id: string;
  brand: string;
  affectation: string;
  parts: Part[];
  status?: "active" | "maintenance" | "retired";
  lastInspection?: Date;
};

export type InspectionStatus = "pending" | "in_progress" | "completed";
export type PartStatus = "good" | "warning" | "critical";
