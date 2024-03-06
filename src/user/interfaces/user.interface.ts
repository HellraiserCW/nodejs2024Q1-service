export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateUser {
  login: string;
  password: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}
