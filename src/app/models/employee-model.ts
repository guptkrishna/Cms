import { Company } from "./company-model";

export class Employee {
  employeeCode!: string;
  employeeFirstName!: string;
  employeeLastName!: string;
  employeeEmail!: string;
  employeeMobileNumber!: number;
  employeePortalUserName!: string;
  password!:string;
  employeeStatus!: string;
  employeeTeam!: string;
  address1!: string;
  address2!: string;
  city!: string;
  state!: string;
  country!: string;
  pinCode!: number;
  company! :Company;
  companyId!: number;
}

export class EmployeeUpdate {
  id!: number;
  employeeCode!: string;
  employeeFirstName!: string;
  employeeLastName!: string;
  employeeEmail!: string;
  employeeMobileNumber!: number;
  employeePortalUserName!: string;
  password!:string;
  employeeStatus!: string;
  employeeTeam!: string;
  address1!: string;
  address2!: string;
  city!: string;
  state!: string;
  country!: string;
  pinCode!: number;
  companyId!: number;
}
