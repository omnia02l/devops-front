import { Team } from "./Team";

export interface Dancer {
  iddancer?: number;
  dfirstname?: string;
  dlastname?: string;
  dateofbirthd?: Date;
  dgender?: Gender;
  demail?: string;
  age: number;
  team?: Team;
}

export enum Gender {
  man = 'man',
  women = 'women',
  other ='other'
}
