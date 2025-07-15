import { CrmPaymentMethodType } from "@/constants/crm.constant";
import { ICurrency } from "..";

export interface INewTransaction {
    invoiceId: string;
    referenceId?: string;
    method: CrmPaymentMethodType | '';
    amount: number;
    note?: string;
    paidAt: Date;
}

export interface ITransactionModel {
    _id: string;
    userId: string;
    invoiceId: string;
    clientId: string;
    invoiceNumber: string;

    referenceId?: string;
    method: CrmPaymentMethodType;
    amount: number;
    note?: string;
    paidAt: Date;
    isSent: boolean;
    currency: ICurrency;
    createdAt?: Date;
    updatedAt?: Date;
}