import { CrmServiceUnitType } from "@/constants/crm.constant";

export interface INewService {
    name: string;
    description?: string;
    unit: CrmServiceUnitType;
    basePrice: number;
}

export interface IServiceModel {
    _id: string;
    userId: string;
    name: string;
    slug: string;
    description?: string;
    unit: CrmServiceUnitType;
    basePrice: number;

    createdAt?: Date;
    updatedAt?: Date;
}