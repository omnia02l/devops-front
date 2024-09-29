import { Dancecategory } from "./Dancecategory";
import { Performance } from "./Performance";
import { Team } from "./Team";

import { Venue } from "./Venue";

export interface Competition {
  idcomp?: number;
  startdate?: Date;
  enddate?: Date;
  comprules?: string;
  nbdancers?: number;
  compname?: string;
  cdescreption?: string;
  regisdeadline?: Date;
  compstatus?: compstatus;
  feesperparticipant?: number;
  ageg?: Agegroup;
  compimage?: string;
  result?: string;
  style?: string;
  full?: boolean;
  teams?: Team[];
  performances?: Performance[];
  dancecateg?: Dancecategory;
  venue?: Venue;

}
export enum Agegroup {
  Children,
    Adults,
    Teenager
}
export enum compstatus {
  Ongoing,
  Upccoming,
  Concluded
}

