import { ICurrency } from ".";

export interface IOrganization {
    _id: string;
    userId: string;

    name: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;

    logoUrl?: string;
    taxId?: string;
    currency: ICurrency;

    footerText?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
