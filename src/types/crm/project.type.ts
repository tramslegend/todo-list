import { CrmProjectPriorityType, CrmProjectStatusType, CrmUnitsType } from "@/constants/crm.constant";
import { IInvoiceItem } from "./item.type";



export interface INewProject {
    clientId: string;
    name: string;
    description?: string;
    startDate: Date;
    dueDate: Date;
    priority: CrmProjectPriorityType;
    note?: string;
}

export interface IProjectModel {
    _id: string;
    userId: string;
    clientId: string;
    name: string;
    description?: string;

    status: CrmProjectStatusType;
    priority: CrmProjectPriorityType;
    startDate: Date;
    dueDate: Date;
    completedAt?: Date;

    note?: string;
    isArchived: boolean;
    archivedAt: Date;

    createdAt?: Date;
    updatedAt?: Date;
}