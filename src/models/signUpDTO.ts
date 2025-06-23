
export interface SignUpDTO {
    name: string;
    email: string;
    password: string;
    contact: string;
    streetAddress: string;
    townOrCity?: string;
    provinceOrState?: string;
    postalCode?: string;
    role?: string;
}