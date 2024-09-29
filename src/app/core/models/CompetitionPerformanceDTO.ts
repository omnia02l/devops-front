import { Performance } from "./Performance";
export interface CompetitionPerformanceDTO{
  compname?: string;
  startdate?: Date;
  enddate?: Date;
  performances?: Performance[];
}
