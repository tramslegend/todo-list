import { CrmInvoiceStatusType, } from "@/constants/crm.constant";
import { IInvoiceItem } from "./item.type";
import { ICurrency } from "..";


export interface IInvoiceCascadeData {
    canDelete: boolean,
    transactions: string[],
}


export interface INewInvoice {
    clientId: string;
    projectId?: string;

    title: string;
    items: IInvoiceItem[];
    discount: number;
    currency: ICurrency | null;
    issuedDate: Date;
    dueDate: Date;
    note?: string;
}

export interface IInvoiceModel {
    _id: string;
    title: string;
    userId: string;
    clientId: string;
    projectId?: string;
    invoiceNumber: string;

    totalAmount: number;
    amountPaid: number;
    subtotal: number;
    discount: number;
    currency: ICurrency;
    items: IInvoiceItem[];

    status: CrmInvoiceStatusType;
    issuedDate: Date;
    dueDate: Date;

    note?: string;
    token?: string;
    isSent: boolean;
    isArchived: boolean;
    archivedAt?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}