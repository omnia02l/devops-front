import { Time } from "@angular/common";
import { Competition } from "./Competition";
import { Music } from "./Music";
import { Reward } from "./Reward";

export interface Performance {
  idperf?: number;
  perfdate?: Date;
  starttime?: Date;
  endtime?: Date;
  pdescreption?: string;
  perftitle?: string;
  teamimage?: string;
  idTeam?: number;

  competition?: Competition;
  music?: Music;
  votes?: any;
  rewards?: Reward[];
}
