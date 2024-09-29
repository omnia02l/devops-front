import {Vote} from "./Vote";
import {ResultComment} from "./ResultComment";
import {Performance} from "./Performance";


export interface Result {
  idResultat: number;
  resultat: number;
  nombresvotes?: number;
  likes:number;
  dislikes:number;
  dateR: Date;
  resultatcommentaires?: ResultComment[];
  votes?: Vote[];
  performanceId?: Performance;

}
