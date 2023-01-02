import { TransType } from "./TransType.enum";

export interface Trans {
    id: number,
    transType: number,
    amount: number,
    cardId: number
   }