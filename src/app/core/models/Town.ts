
import { Venue } from "./Venue";

export interface Town {
  idtown?: number;
  townname?: string;
  country?: string;
  population?: number;
  landmarks?: string;

  venues?: Venue[];
}
