import { CrmUnitsType } from "@/constants/crm.constant";

export interface IServicesItem {
    name: string;
    slug: string;
    description?: string;
    quantity: number;
    unit: CrmUnitsType;
    basePrice: number;
    totalAmount: number;
}

export interface INewService {
    name: string;
    description?: string;
    unit: CrmUnitsType;
    basePrice: number;
}

export interface IServiceModel {
    _id: string;
    userId: string;
    name: string;
    slug: string;
    description?: string;
    unit: CrmUnitsType;
    basePrice: number;

    createdAt?: Date;
    updatedAt?: Date;
}