import { Prisma, User } from '@prisma/client';
import { UserCreateDto } from '../dtos/user.create.dto';

export interface IUserService {
  clearCache(): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: UserCreateDto): Promise<User>;
  createMany(users: UserCreateDto[]): Promise<Prisma.BatchPayload>;
  deleteAll(): Promise<void>;
}
