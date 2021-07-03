export class UsersDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly roles: string[];
  readonly password: string;

  createdAt: Date;
  updatedAt: Date;
}
