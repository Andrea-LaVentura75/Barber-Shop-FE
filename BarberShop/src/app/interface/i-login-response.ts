import { IBarber } from './i-barber';
import { iUser } from './i-user';

export interface ILoginResponse {
  accessToken: string;
  user: iUser | IBarber;
}
