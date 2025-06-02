
export interface UserDTO{
    id?: number | null;
    name: string;
    email: string;
    contact: string;
    address: string;
    role: string;
    createDate?: string;
    createBy?: string;
    modifyDate?: string;
    modifyBy?: string;
}