import { Competition } from "./Competition";
import { Dancer } from "./Dancer";
import { Registration } from "./Registration";

export interface Team {
  idteam?: number;
  teamname?: string;
  nbdancers?: number;
  leadername?: string;
  tdescreption?: string;
  teamtype?: Teamtype;
  skilllevel?: Skilllevel;
  registrations?: Registration[];
  dancers?: Dancer[];
  competitions?: Competition[];
}
export enum Teamtype {
  Solo ,
    Group
}
export enum Skilllevel {
  Beginner,
    Professional,
    Intermidiate
}

