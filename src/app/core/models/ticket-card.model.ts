import { PurchaseTransaction } from "./purchase-transaction.model";
import { Ticket } from "./ticket.model";

export class TicketCard {
    idCardT?: number;
    total?: number;
    tickets?: Ticket[];
    purchaseTransactions?: PurchaseTransaction[];
    userid?:number;
    date?:Date;
  
}
