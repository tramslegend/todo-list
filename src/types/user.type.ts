interface ISigninMethod {
    id: string;
    lastUsed: Date;
}

interface IEmailEntry {
    address: string;
    verified: boolean;
    primary?: boolean;
}

export interface IUser {
    _id: string;
    name: string;
    avatar?: string;
    primaryEmail: string;
    emails: IEmailEntry[];
    signinMethods: {
        [provider: string]: ISigninMethod | undefined;
    };
    createdAt: Date;
    updatedAt: Date;
}