import { Building } from "./building-model";

export class Assets{
    assetsType!: string;
    assetsCode!: string;
    assetsName!: string;
    assetsManufacturer!: string;
    assetsSupplier!: string;
    assetsPurchasePrice!: number;
    assetsInvoiceNumber!: string;
    assetsCurrentValue!: number;
    assetsYearofLife!: number;
    assetsAmortizationEnd!: Date;
    assetsDisposalDate!: Date;
    assetsAmortizationStart!: Date;
    assetsAnnualAmortization!: string;
    assetsSubset!: string;
    assetsCondition!: string;
    assetsCriticality!: string;
    assetsLastCheckDate!: Date;
    floor!: string;
    room!: string;
    buildingId!: number;
    building!:Building
}
export class AssetsUpdate{
    id!:number;
    assetsType!: string;
    assetsCode!: string;
    assetsName!: string;
    assetsManufacturer!: string;
    assetsSupplier!: string;
    assetsPurchasePrice!: number;
    assetsInvoiceNumber!: string;
    assetsCurrentValue!: number;
    assetsYearofLife!: number;
    assetsAmortizationEnd!: Date;
    assetsDisposalDate!: Date;
    assetsAmortizationStart!: Date;
    assetsAnnualAmortization!: string;
    assetsSubset!: string;
    assetsCondition!: string;
    assetsCriticality!: string;
    assetsLastCheckDate!: Date;
    floor!: string;
    room!: string;
    buildingId!: number;

}
