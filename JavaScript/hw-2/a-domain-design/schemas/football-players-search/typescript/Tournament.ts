import { Country } from "./Country";
import { Club } from "./Club";

export interface Tournament {
  name: string;
  country?: string;
  teamNumber: number;
  teams: Country[] | Club[];
}
