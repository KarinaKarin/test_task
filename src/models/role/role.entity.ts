import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
enum RoleEnum {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
  'MANAGER' = 'MANAGER',
}

@Entity('role')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: RoleEnum, unique: true })
  value: RoleEnum;

  // @OneToMany(() => UserEntity, (user) => user.role)
  // @Column()
  // users: UserEntity[];
}
