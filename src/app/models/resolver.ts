export interface ResolverI {
    id?:string;
    name?: string;
    last_name?: string;
    email?: string;
    solution?: string;
    date?: Date;
    complaint_number?: string;
    suspended_account?: boolean;
    responsible?: string;
    status?: string; 
}