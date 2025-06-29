
export interface ResponseDTO{
    statusCode: number;
    message: string;
    timestamp: string;
    data?: any | null; // Optional field to hold the response data
}