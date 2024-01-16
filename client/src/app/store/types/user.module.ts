export interface User {
  id?: number;
  username?: string;
  password?: string;
  listatimova?: string[];
}
export class UserModel implements User {
  id?: number;
  username?: string;
  password?: string;
  listatimova?: string[];
  constructor(
    id?: number,
    username?: string,
    password?: string,
    listatimova?: string[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.listatimova = listatimova;
  }
}
