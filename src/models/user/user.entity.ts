import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum RoleEnum {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
  'MANAGER' = 'MANAGER',
}

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  email: string;

  @Column({ default: null, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @ApiProperty()
  @Column({ nullable: true })
  city: string;

  @ApiProperty()
  @Column({ nullable: true })
  street: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  hasADog: boolean;

  @ApiProperty({
    description: 'key to user photo: bucket_number/photo.jpeg',
    example: '5/panda.jpeg',
  })
  @Column({ nullable: true })
  s3Key: 'string';

  @Column({ nullable: true })
  bucket: 'string';

  @Column({ nullable: true })
  mime: 'string';
}
