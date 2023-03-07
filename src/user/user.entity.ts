import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'date' })
  birth_date: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  street: string;

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: false,
  })
  hasADog: boolean;

  @ApiProperty()
  @Column({ type: 'varchar' })
  photo: string;
}
