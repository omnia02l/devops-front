import { Venue } from "./Venue";

export interface TownWithVenuesDTO {
  townName: string;
  venues: Venue[];
}
