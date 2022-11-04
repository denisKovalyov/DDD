import { City } from './City';

export interface Stadium {
  name: string;
  capacity: number,
  constructed: Date,
  city: City,
}
