import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Crud({
  model: {
    type: RoleEntity,
  },
})
@Controller('role')
export class RoleController implements CrudController<RoleEntity> {
  constructor(public service: RoleService) {}
}
