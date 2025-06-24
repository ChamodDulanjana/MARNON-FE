
export interface UserDTO{
    id?: number | null;
    name: string;
    email: string;
    contact: string;
    streetAddress: string;
    townOrCity?: string;
    provinceOrState?: string;
    postalCode?: string;
    role: string;
    createDate?: string;
    createBy?: string;
    modifyDate?: string;
    modifyBy?: string;
}