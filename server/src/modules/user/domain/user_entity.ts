export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  createdAt: string | undefined;
  updatedAt: string | undefined;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    status: boolean,
    createdAt?: string | undefined,
    updatedAt?: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
