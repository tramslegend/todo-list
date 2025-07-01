import { CrmProjectPriorityType, CrmProjectStatusType, CrmUnitsType } from "@/constants/crm.constant";
import { IServicesItem } from "./service.type";



export interface INewProject {
    clientId: string;
    name: string;
    description?: string;
    services: IServicesItem[];
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
    services: IServicesItem[];
    startDate?: Date;
    dueDate?: Date;
    completedAt?: Date;

    note?: string;

    createdAt?: Date;
    updatedAt?: Date;
}