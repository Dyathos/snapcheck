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

export interface MaintenanceTask {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  vehicleId: string;
  inspectionId?: string;
  vehicle: {
    brand: string;
    affectation: string;
  };
  inspection?: {
    date: Date;
    inspector: string;
  };
}

export interface MaintenanceTaskFormData {
  description: string;
  priority: MaintenanceTask['priority'];
  status: MaintenanceTask['status'];
  assignedTo?: string;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  vehicleId: string;
  inspectionId?: string;
}

// src/types.d.ts
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    lastName?: string | null; // Add this line
  }
}