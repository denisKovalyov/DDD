import { City } from './City';
import { Stadium } from './Stadium';

export interface Club {
  name: string;
  founded: Date;
  city: City,
  stadium: Stadium,
}
