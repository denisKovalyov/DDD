import { Role } from "./Role";
import { Country } from "./Country";
import { Club } from "./Club";

export interface Player {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  roles: Role[];
  nationality: Country;
  club: Club;
}
