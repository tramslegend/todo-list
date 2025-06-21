export interface TsIAdmin {
    _id: string;
    name: string;
    email: string;
    password?: string;
    roles?: string[];
    phone?: string;
    avatar?: string;
    isArchived: boolean;
    archivedAt?: Date;
    isSuperAdmin?: boolean;
}