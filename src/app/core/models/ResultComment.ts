import {Result} from "./Result";

export interface ResultComment {
  idCom: number;
  comment: string;
  datecom: Date;
  result?: Result;
}
