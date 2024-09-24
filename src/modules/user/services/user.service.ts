import { PrismaService } from '@common/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '../dtos/user.create.dto';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(user: UserCreateDto) {
    return this.prismaService.user.create({ data: user });
  }

  async createMany(users: UserCreateDto[]) {
    return this.prismaService.user.createMany({ data: users });
  }

  async deleteAll() {
    await this.prismaService.user.deleteMany();
  }
}
