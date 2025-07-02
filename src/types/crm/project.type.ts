import { CrmProjectPriorityType, CrmProjectStatusType, CrmUnitsType } from "@/constants/crm.constant";
import { IInvoiceItem } from "./item.type";



export interface INewProject {
    clientId: string;
    name: string;
    description?: string;
    items: IInvoiceItem[];
    startDate?: Date;
    dueDate?: Date;
    note?: string;
}

export interface IProjectModel {
    _id: string;
    userId: string;
    clientId: string;
    name: string;
    description?: string;

    status: CrmProjectStatusType;
    priority?: CrmProjectPriorityType;
    totalAmount: number;
    items: IInvoiceItem[];
    startDate?: Date;
    dueDate?: Date;
    completedAt?: Date;

    note?: string;

    createdAt?: Date;
    updatedAt?: Date;
}