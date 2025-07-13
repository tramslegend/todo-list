import { ICurrency } from ".";

export interface IOrganizationModel {
    _id: string;
    userId: string;

    name: string;
    email?: string;
    phone?: string;
    website?: string;
    address1?: string;
    address2?: string;

    logo?: string;
    taxId?: string;
    currency: ICurrency;

    footerText?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
