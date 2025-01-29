import { iUser } from './i-user';

export interface IBarber extends iUser {
  comuneSalone: string;
  viaSalone: string;
  nomeSalone: string;
  rangeAppuntamento: number;
}
