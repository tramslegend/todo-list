import { CrmUnitsType } from "@/constants/crm.constant";

export interface IInvoiceItem {
    name: string;
    slug: string;
    description?: string;
    quantity: number;
    unit: CrmUnitsType;
    basePrice: number;
    totalAmount: number;
}

export interface INewItem {
    name: string;
    description?: string;
    unit: CrmUnitsType;
    basePrice: number;
}

export interface IItemModel {
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