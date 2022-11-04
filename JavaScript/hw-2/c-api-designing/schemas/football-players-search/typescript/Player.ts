import { Position } from './Position';
import { Country } from './Country';
import { Club } from './Club';

export interface Player {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  positions: Position[];
  nationality: Country;
  club: Club;
}
