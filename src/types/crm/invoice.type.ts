import { CrmInvoiceStatusType, } from "@/constants/crm.constant";
import { IInvoiceItem } from "./item.type";



export interface INewInvoice {
    clientId: string;
    name: string;
    description?: string;
    items: IInvoiceItem[];
    startDate?: Date;
    dueDate?: Date;
    note?: string;
}

export interface IInvoiceModel {
    _id: string;
    userId: string;
    clientId: string;
    name: string;
    description?: string;

    status: CrmInvoiceStatusType;
    totalAmount: number;
    items: IInvoiceItem[];
    startDate?: Date;
    dueDate?: Date;
    completedAt?: Date;

    note?: string;

    createdAt?: Date;
    updatedAt?: Date;
}