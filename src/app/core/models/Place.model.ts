import { Row } from "./row.model";
import { VenuePlan } from "./venue-plan.model";

export class Place {
 
  idPlace?: number;
  temporaryId?  :number;
  seatNumber?: string; // Utilisez string si vous avez des sièges comme 'A1', 'B2', etc.
  row?: string;
  isOccupied?: boolean;
  isSelected?: boolean;
  venuePlan?:VenuePlan;
  bookingCoun?:number;
  status?: string;
  }