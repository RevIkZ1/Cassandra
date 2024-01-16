import { types } from 'cassandra-driver';

export class User {
  UserID: types.Uuid;

  username: string;

  password: string;

  listatimova: string[];
}
export class LoginDto {
  username: string;
  password: string;
}
