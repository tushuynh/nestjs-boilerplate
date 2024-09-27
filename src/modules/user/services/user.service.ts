import { PrismaService } from '@common/prisma/services/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Cache } from 'cache-manager';
import { UserCreateDto } from '../dtos/user.create.dto';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService
  ) {}

  async clearCache() {
    const keys = await this.cacheManager.store.keys();
    const prefix = this.configService.get('app.globalPrefix');
    const version = this.configService.get('app.versioning.version');
    keys.forEach((key) => {
      if (key.startsWith(`${prefix}/${version}/users`)) {
        this.cacheManager.del(key);
      }
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async create(user: UserCreateDto) {
    const createdUser = await this.prismaService.user.create({ data: user });
    await this.clearCache();
    return createdUser;
  }

  async createMany(users: UserCreateDto[]) {
    return this.prismaService.user.createMany({ data: users });
  }

  async deleteAll() {
    await this.prismaService.user.deleteMany();
  }
}
