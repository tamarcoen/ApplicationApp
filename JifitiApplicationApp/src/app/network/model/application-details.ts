import { TransType } from "./TransType.enum";

export interface ApplicationDetails {
    cardNo: string;
    issuer: string;
    transType: TransType;
    amount: number;
}