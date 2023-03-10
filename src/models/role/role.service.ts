import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) repo) {
    super(repo);
  }
}
