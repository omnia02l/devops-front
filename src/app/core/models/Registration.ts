import { Team } from "./Team";

export interface Registration {
  idreg?: number;
  registration_date?: Date;
  statusreg?: string;//statusreg;
  videolink?: string;
  videofile?: File;
  amountpaid?: number;
  approved_date?: Date;
  rejected_date?: Date;
  username?: string;
  user?: any;
  team?: Team;
}
/*export enum statusreg {
  Pending,
        Approved,
        Rejected
}*/
