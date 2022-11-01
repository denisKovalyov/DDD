import { City } from "./City";
import { Stadium } from "./Stadium";

export interface Club {
  name: string;
  foundation: number;
  city: City,
  stadium: Stadium,
}
