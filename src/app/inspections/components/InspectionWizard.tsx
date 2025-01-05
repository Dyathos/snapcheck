"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    role: string;
    firstName: string;
    lastName: string;
    badge: string;
  } & Session["user"];
}

type Part = {
  id: string;
  name: string;
  status: string;
  severity: string;
  description: string | null;
  category: string | null;
  icon: string | null;
  isDefault: boolean;
  vehicleId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Vehicle = {
  id: string;
  brand: string;
  affectation: string;
  photo: string | null;
  healthStatus: string | null;
  lastInspection: Date | null;
  parts: Part[];
  createdAt: Date;
  updatedAt: Date;
};

type PartInspection = {
  id: string;  // Ensure the id field is present
  status: "good" | "warning" | "critical";
  notes: string;
};

const STATUS_LABELS = {
  good: "Bon état",
  warning: "À surveiller",
  critical: "Critique",
};

export function InspectionWizard({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession | null };
  const [step, setStep] = useState(1);
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
  const [inspectedParts, setInspectedParts] = useState<
    Record<string, PartInspection>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Vérification simple de la session et du rôle
  if (!session?.user || session.user.role !== "Inspecteur") {
    return <div>Accès réservé aux inspecteurs.</div>;
  }

  // Étape 1 : Sélection des pièces à inspecter
  const SelectPartsStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        Sélectionnez les pièces à inspecter
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {vehicle.parts.map((part) => (
          <button
            key={part.id}
            onClick={() => {
              const newSelected = new Set(selectedParts);
              if (selectedParts.has(part.id)) {
                newSelected.delete(part.id);
              } else {
                newSelected.add(part.id);
              }
              setSelectedParts(newSelected);
            }}
            className={`p-4 border rounded-lg text-left transition-colors ${
              selectedParts.has(part.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{part.name}</h4>
                {part.description && (
                  <p className="text-sm text-gray-500">{part.description}</p>
                )}
              </div>
              <Badge
                variant={
                  part.severity === "critical"
                    ? "destructive"
                    : part.severity === "high"
                    ? "warning"
                    : "default"
                }
              >
                {part.status}
              </Badge>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={() => setStep(2)} disabled={selectedParts.size === 0}>
          Continuer
        </Button>
      </div>
    </div>
  );

  // Étape 2 : Inspection des pièces sélectionnées
  const InspectPartsStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        Inspectez les pièces sélectionnées
      </h3>
      {Array.from(selectedParts).map((partId) => {
        const part = vehicle.parts.find((p) => p.id === partId);
        if (!part) return null;

        return (
          <div key={part.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{part.name}</h4>
              <Badge
                variant={
                  part.severity === "critical"
                    ? "destructive"
                    : part.severity === "high"
                    ? "warning"
                    : "default"
                }
              >
                État actuel : {part.status}
              </Badge>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nouvel état
              </label>
              <select
                value={inspectedParts[part.id]?.status || "good"}
                onChange={(e) => {
                  setInspectedParts({
                    ...inspectedParts,
                    [part.id]: {
                      id: part.id,  // Ensure the id is included
                      status: e.target.value as "good" | "warning" | "critical",
                      notes: inspectedParts[part.id]?.notes || "",
                    },
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="good">Bon état</option>
                <option value="warning">À surveiller</option>
                <option value="critical">Critique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={inspectedParts[part.id]?.notes || ""}
                onChange={(e) => {
                  setInspectedParts({
                    ...inspectedParts,
                    [part.id]: {
                      id: part.id,  // Ensure the id is included
                      status: inspectedParts[part.id]?.status || "good",
                      notes: e.target.value,
                    },
                  });
                }}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        );
      })}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep(1)}>
          Retour
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={Object.keys(inspectedParts).length !== selectedParts.size}
        >
          Continuer
        </Button>
      </div>
    </div>
  );

  // Étape 3 : Résumé des changements
  const SummaryStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Résumé des changements</h3>
      <div className="space-y-4">
        {Array.from(selectedParts).map((partId) => {
          const part = vehicle.parts.find((p) => p.id === partId);
          const inspection = inspectedParts[partId];
          if (!part || !inspection) return null;

          return (
            <div key={part.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{part.name}</h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">Avant : {part.status}</Badge>
                  <span className="text-gray-500">→</span>
                  <Badge
                    variant={
                      inspection.status === "critical"
                        ? "destructive"
                        : inspection.status === "warning"
                        ? "warning"
                        : "success"
                    }
                  >
                    Après : {STATUS_LABELS[inspection.status]}
                  </Badge>
                </div>
              </div>
              {inspection.notes && (
                <p className="mt-2 text-sm text-gray-500">{inspection.notes}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep(2)}>
          Modifier
        </Button>
        <Button onClick={() => setStep(4)}>Continuer</Button>
      </div>
    </div>
  );

  // Étape 4 : Confirmation finale
  const FinalConfirmationStep = () => {
    const unchangedParts = vehicle.parts.filter(
      (part) => !selectedParts.has(part.id)
    );

    const handleSubmit = async () => {
      try {
        setIsSubmitting(true);
        setError(null);

        const payload = {
          inspector: `${session.user.firstName} ${session.user.lastName}`,
          badge: session.user.badge,
          vehicleId: vehicle.id,
          status: "completed",
          parts: Array.from(selectedParts).map((partId) => ({
            partId,  // Utiliser partId au lieu de id
            status: inspectedParts[partId].status,
            notes: inspectedParts[partId]?.notes || "",
          })),
        };
        

        const response = await fetch("/api/inspections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la création de l'inspection");
        }

        router.refresh();
        router.push("/inspections");
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erreur inattendue");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Confirmation des autres pièces
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {unchangedParts.length} pièces n'ont pas été modifiées. Leur
                  état précédent sera conservé.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Pièces non modifiées :</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {unchangedParts.map((part) => (
              <div key={part.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{part.name}</h5>
                  <Badge
                    variant={
                      part.status === "critical"
                        ? "destructive"
                        : part.status === "warning"
                        ? "warning"
                        : "success"
                    }
                  >
                    {part.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(3)}>
            Retour
          </Button>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Ajouter une pièce
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Validation..." : "Valider l'inspection"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <nav className="flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center ${
                stepNumber === step
                  ? "text-blue-600"
                  : stepNumber < step
                  ? "text-gray-500"
                  : "text-gray-300"
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  stepNumber === step
                    ? "bg-blue-600 text-white"
                    : stepNumber < step
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {stepNumber}
              </span>
              <span className="ml-2 text-sm font-medium">
                {stepNumber === 1 && "Sélection"}
                {stepNumber === 2 && "Inspection"}
                {stepNumber === 3 && "Résumé"}
                {stepNumber === 4 && "Validation"}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {step === 1 && <SelectPartsStep />}
      {step === 2 && <InspectPartsStep />}
      {step === 3 && <SummaryStep />}
      {step === 4 && <FinalConfirmationStep />}
    </div>
  );
}