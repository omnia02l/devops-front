import {Result} from "./Result";
import {Performance} from "./Performance";
import {UserDTO} from "./userDTO";


export interface Vote {
  idVote: number;
  score: number;
  com: string;
  votedate: Date ;
  result?: Result;
  performance?: Performance;
  user? : UserDTO
}
