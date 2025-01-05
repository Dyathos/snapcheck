"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getSession } from "next-auth/react";

// Schémas de validation
const partSchema = z.object({
  id: z.string(),
  status: z.enum(["good", "warning", "critical"]),
  notes: z.string().optional(),
});

const inspectionSchema = z.object({
  inspector: z.string().min(1, "Le nom de l'inspecteur est requis"),
  badge: z.string().nullable(), // Permettre null pour le badge
  status: z.enum(["pending", "in_progress", "completed"]),
  notes: z.string().optional(),
  parts: z.array(partSchema),
  defaultParts: z.array(z.string()).optional(),
});

type InspectionFormData = z.infer<typeof inspectionSchema>;

interface Part {
  id: string;
  name: string;
  status: string;
  severity: string;
  description?: string;
  category?: string;
  icon?: string;
}

interface Vehicle {
  id: string;
  brand: string;
  affectation: string;
  parts: Part[];
}

export function InspectionForm({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultParts, setDefaultParts] = useState<Part[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: {
      inspector: "",
      badge: null,
      status: "in_progress",
      notes: "",
      parts: vehicle.parts.map((part) => ({
        id: part.id,
        status: "good",
        notes: "",
      })),
    },
  });

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const session = await getSession();
        if (!session?.user) {
          throw new Error("Utilisateur non connecté");
        }

        const user = session.user as any; // Type assertion pour accéder aux propriétés personnalisées
        if (user.role !== "Inspecteur") {
          throw new Error("Vous n'êtes pas autorisé à réaliser une inspection");
        }

        setValue("inspector", `${user.firstName} ${user.lastName}`);
        setValue("badge", user.badge || null);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erreur d'initialisation";
        alert(message);
        router.push("/"); // Redirection vers la page d'accueil en cas d'erreur
      }
    };

    initializeForm();
  }, [setValue, router]);

  useEffect(() => {
    const loadDefaultParts = async () => {
      try {
        const response = await fetch("/api/parts/defaults");
        if (!response.ok) throw new Error("Erreur lors du chargement des pièces par défaut");
        const data = await response.json();
        setDefaultParts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des pièces par défaut:", error);
      }
    };

    loadDefaultParts();
  }, []);

  const onSubmit = async (data: InspectionFormData) => {
    try {
      setSubmitError(null);
      setIsSubmitting(true);

      const selectedDefaultParts = defaultParts
        .filter((part) => {
          const checkbox = document.getElementById(`part-${part.id}`) as HTMLInputElement;
          return checkbox?.checked;
        })
        .map((part) => part.id);

      const payload = {
        inspector: data.inspector,
        status: data.status,
        badge: data.badge,
        notes: data.notes || undefined,
        vehicleId: vehicle.id,
        defaultParts: selectedDefaultParts,
        parts: data.parts.map((part) => ({
          partId: part.id,
          status: part.status,
          notes: part.notes || "",
        })),
      };

      // Ajouter le badge seulement s'il existe
      if (data.badge) {
        payload.badge = data.badge;
      }

      const response = await fetch("/api/inspections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création de l'inspection");
      }

      router.refresh();
      router.push("/inspections");
    } catch (error) {
      console.error("Error creating inspection:", error);
      setSubmitError(error instanceof Error ? error.message : "Erreur lors de la création de l'inspection");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Le reste du JSX reste identique */}
    </form>
  );
}
