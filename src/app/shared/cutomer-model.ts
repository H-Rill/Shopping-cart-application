import { EntityState } from "@ngrx/entity";

export interface Customers {
    id: number;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
    email: string;
    birthdate: string;
    mobilenumber: string;
    role: string;
    isActive: boolean;
  }
  export interface CustomerCred {
    username: string;
    password: string;
  }
  export interface CustomerInfo {
    id: number;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    birthdate: string;
    interests: string[];
    mobilenumber: string;
    role: string;
    isActive: boolean;
    dateCreated: string;
    dateUpdated: string;
  }
export interface CustomerModel extends EntityState<Customers>{
    customerInfo:CustomerInfo
 }

 export interface ForgotPasswordFormData {
    username: string;
    email: string;
    mobileNumber: string;
  }

  export interface CustomerProfile {
    id: number;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    birthdate: string;
  }