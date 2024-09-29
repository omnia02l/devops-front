
import { Dancer } from "./Dancer";
import { Registration } from "./Registration";
import { Team } from "./Team";
export interface RegistrationDTO {
  registration: Registration;
  team: Team;
  dancers: Dancer[];
}
