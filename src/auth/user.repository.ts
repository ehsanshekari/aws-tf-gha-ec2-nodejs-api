import { plainToClass } from 'class-transformer';
import { dataSource } from '../db/datasource';
import { User } from './user.entity';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

export const UserRepository = dataSource.getRepository(User).extend({
  findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  },
  async createUser(
    email: string,
    passwordHash: string,
    username: string,
    firstName?: string,
    lastName?: string
  ): Promise<UserWithoutPassword> {
    const user = this.create({
      email,
      passwordHash,
      username,
      firstName,
      lastName,
    });
    return plainToClass(User, await this.save(user));
  },
});
