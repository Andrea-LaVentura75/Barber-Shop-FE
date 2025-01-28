export interface iRegisterRequest {
  username: string;
  email: string;
  nome: string;
  cognome: string;
  password: string;
  barber?: boolean;
  comuneSalone?: string;
  viaSalone?: string;
  nomeSalone?: string;
  rangeAppuntamento?: number;
}
