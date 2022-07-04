import { Complex } from "./complex-model";

export class Building{
  buildingCode!: string;
  buildingName!: string;
  buildingAvailability!: string;
  buildingMainUse!: string;
  buildingTotalGrossArea!: string;
  buildingTotalNetArea!: string;
  buildingCoveredArea!: string;
  buildingGlazedArea!: string;
  buildingTotalVolume!: string;
  buildingCleanableArea!: string;
  buildingTotalheatedvolume!: string;
  buildingNumberofFloors!: number;
  buildingNumberofRoom!: number;
  buildingCondition!: string;
  buildingCriticality!: string;
  address!:string;
   //address!:string;
    city!:string;
    state!:string;
    country!:string;
    pinCode!:number;
  complexId!: number;

}
export class BuildingUpdate{
    id!:number;
    buildingCode!: string;
    buildingName!: string;
    buildingAvailability!: string;
    buildingMainUse!: string;
    buildingTotalGrossArea!: string;
    buildingTotalNetArea!: string;
    buildingCoveredArea!: string;
    buildingGlazedArea!: string;
    buildingTotalVolume!: string;
    buildingCleanableArea!: string;
    buildingTotalheatedvolume!: string;
    buildingNumberofFloors!: number;
    buildingNumberofRoom!: number;
    buildingCondition!: string;
    buildingCriticality!: string;
    address!:string;
    complex!:Complex
     //address2!:string;
    city!:string;
    state!:string;
    country!:string;
    pinCode!:number;
    complexId!: number;
  
  }