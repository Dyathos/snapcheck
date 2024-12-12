export interface Part {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  vehicleId: string;
  severity: string;
  description: string | null;  // Changed from string | undefined to string | null
  category: string | null;     // Changed from string | undefined to string | null
  icon: string | null;         // Changed from string | undefined to string | null
  isDefault: boolean;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  plateNumber: string;
  vin?: string;
  createdAt: Date;
  updatedAt: Date;
  parts: Part[];
  healthStatus?: string;
  lastInspection?: Date;
}
