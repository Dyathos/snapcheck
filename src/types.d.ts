// User Types
export type Role = 'Inspecteur' | 'Maintenance' | 'Safety';

export interface User {
  name: string;
  id: number;
  firstName: string;
  lastName: string;
  department?: string | null;
  phone?: string | null;
  badge?: string | null;
  password: string;
  role: Role;
  email: string;
  photo?: string | null;
}

// Vehicle Types
export interface Vehicle {
  id: string;
  brand: string;
  affectation: string;
  photo?: string | null;
  createdAt: Date;
  updatedAt: Date;
  healthStatus?: string | null;
  lastInspection?: Date | null;
  parts: Part[];
  inspectionVehicles: InspectionVehicle[];
  checkInParts: CheckInPart[];
  maintenanceTasks: MaintenanceTask[];
}

// Inspection Types
export type InspectionStatus = 'in_progress' | 'completed' | 'cancelled';

export interface Inspection {
  id: string;
  date: Date;
  inspector: string;
  badge: string;
  status: InspectionStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  vehicles: InspectionVehicle[];
  maintenanceTasks: MaintenanceTask[];
}

export interface InspectionVehicle {
  id: string;
  inspectionId: string;
  vehicleId: string;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  inspection: Inspection;
  vehicle: Vehicle;
  parts: InspectionPart[];
}

export interface InspectionPart {
  id: string;
  inspectionVehicleId: string;
  partId: string;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  inspectionVehicle: InspectionVehicle;
  part: Part;
}

// Maintenance Types
export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface MaintenanceTask {
  id: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  assignedTo?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  inspection?: Inspection | null;
  inspectionId?: string | null;
  vehicle: Vehicle;
  vehicleId: string;
}

// Part Types
export type PartStatus = 'good' | 'warning' | 'critical';
export type Severity = 'low' | 'medium' | 'high';

export interface Part {
  id: string;
  vehicleId: string;
  name: string;
  status: PartStatus;
  severity: Severity;
  description?: string | null;
  category?: string | null;
  icon?: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  vehicle: Vehicle;
  inspectionParts: InspectionPart[];
}

export interface DefaultPart {
  id: string;
  name: string;
  icon: string;
  category: string;
  description?: string | null;
  isActive: boolean;
  isDefault: boolean;
  createdAt: Date;
}

// CheckIn Types
export interface CheckInItem {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  category: string;
  isRequired: boolean;
  isDefault: boolean;
  isActive: boolean;
  checkIns: CheckInPart[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckInPart {
  id: string;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  vehicleId: string;
  vehicle: Vehicle;
  itemId: string;
  item: CheckInItem;
  histories: CheckInPartHistory[];
}

export interface CheckInPartHistory {
  id: string;
  checkInPartId: string;
  checkInPart: CheckInPart;
  status: string;
  severity?: string | null;
  description?: string | null;
  inspector?: string | null;
  createdAt: Date;
}

// API Response Types
export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
}

export interface VehicleResponse {
  success: boolean;
  data?: Vehicle;
  error?: string;
}

// Session augmentation for NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: Role;
      badge?: string | null;
      photo?: string | null;
      department?: string | null;
      phone?: string | null;
    }
  }

  interface User {
    id: number;
    role: Role;
    firstName: string;
    lastName: string;
    badge?: string | null;
    department?: string | null;
    phone?: string | null;
    photo?: string | null;
  }
}