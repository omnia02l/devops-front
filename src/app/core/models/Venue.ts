import { Competition } from "./Competition";
import { Town } from "./Town";

export interface Venue {
  idvenue?: number;
  vname?: string ;
  vaddress?: string;
  capacity?: number;
  contact_person?: string;
  vemail?: string;
  phone?: number;
  facilities?: string;
  venueimage?: string;
  town?: Town;
  competitions?: Competition[];
}
