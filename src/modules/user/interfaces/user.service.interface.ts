import { User } from '@prisma/client';
import { UserCreateDto } from '../dtos/user.create.dto';

export interface IUserService {
  findAll(): Promise<User[]>;
  create(user: UserCreateDto): Promise<User>;
  deleteAll(): Promise<void>;
}
