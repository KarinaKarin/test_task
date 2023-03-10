import { DataSource } from 'typeorm';
import { RoleEnum, UserEntity } from './models/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { dbOptions } from './database-connection';

export const authenticate = async (email: string, password: string) => {
  const appDataSource = new DataSource(dbOptions());
  await appDataSource.initialize();
  const repository = appDataSource.getRepository(UserEntity);
  const users = await repository.findBy({ email: email });
  if (users[0] && users[0].role !== RoleEnum.USER) {
    if (bcrypt.compare(password, users[0].password)) {
      return Promise.resolve({ email: users[0].email });
    }
  }
  return null;
};
