import { RoleEnum, UserEntity } from '../models/user/user.entity';
import { roleBasedAccessControl } from '../role-based-access-control';

export const UserResource = {
  resource: UserEntity,
  features: [roleBasedAccessControl],
  options: {
    actions: {
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin.role === RoleEnum.ADMIN,
        isVisible: true,
      },
    },
    properties: {
      birth_date: {
        type: 'date',
        custom: {
          edit: [RoleEnum.ADMIN],
        },
      },
      email: {
        isVisible: false,
      },
      role: {
        isVisible: false,
      },
      id: {
        isVisible: false,
      },
      password: {
        isVisible: false,
      },
    },
  },
};
