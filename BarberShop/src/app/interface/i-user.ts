export interface iUser {
  id: number;
  username: string;
  email: string;
  nome: string;
  cognome: string;
  avatar?: string;
  isBarber: boolean;
  roles: string[];
}
