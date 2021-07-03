import { Document } from 'mongoose';

interface UsersModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Users extends UsersModel, Document {}
