

export interface IClientCascadeData {
    canDelete: boolean,
    projects: string[],
    invoices: string[],
    transactions: string[],
}

export interface IClientModel {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    isIndividual: boolean;
    tags?: string[];
    companyName?: string;
    isArchived?: boolean;
    archivedAt?: Date;
    cleatedAt?: Date;
    updatedAt?: Date;
}


export interface INewClient {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    isIndividual: boolean;
    tags?: string[];
    companyName?: string;
}
