// Global type definitions

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  roles: string[];
  status: boolean;
  departmentIds?: string[];
  unit?: string; // New field for unit
  department?: string; // New field for department
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: string;
  module: string;
  type: string;
}
