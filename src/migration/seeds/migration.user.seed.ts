import { faker } from '@faker-js/faker';
import { UserService } from '@modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

@Injectable()
export class MigrationUserSeed {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'seed:user',
    describe: 'seed users',
  })
  async seeds(): Promise<void> {
    const password = '123123';
    const generateCount = 10000;
    const createUserCommands = [];

    const admin = {
      name: 'admin',
      email: 'admin@gmail.com',
      password,
    };

    const user = {
      name: 'user',
      email: 'user@gmail.com',
      password,
    };

    createUserCommands.push(admin, user);

    for (let i = 0; i < generateCount; i++) {
      createUserCommands.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
      });
    }

    try {
      await this.userService.createMany(createUserCommands);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

  @Command({
    command: 'remove:user',
    describe: 'remove users',
  })
  async remove(): Promise<void> {
    try {
      await this.userService.deleteAll();
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
