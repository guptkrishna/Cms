import { Company } from "./company-model";

export class Complex {
    complexCode!: string;
    complexName!: string;
    complexDescription!: string;
    complexAvailability!:string;
    complexCondition!:string;
    complexCriticality!:string;
    complexTotalGrossArea!:number;
    complexCoveredArea!:number;
    complexTotalVolume!:number;
    complexTotalHeatedVolume!:number;
    address!:string;
    //address2!:string;
    company!:Company
    city!:string;
    state!:string;
    country!:string;
    pinCode!:number;
    companyId!:number;

}
export class ComplexUpdate{
    id!: number;
    complexCode!: string;
    complexName!: string;
    complexDescription!: string;
    complexAvailability!:string;
    complexCondition!:string;
    complexCriticality!:string;
    complexTotalGrossArea!:number;
    complexCoveredArea!:number;
    complexTotalVolume!:number;
    complexTotalHeatedVolume!:number;
    address!:string;
   // address2!:string;
    city!:string;
    state!:string;
    country!:string;
    pinCode!:number;
    companyId!:number;
}