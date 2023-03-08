import { RoleEnum, UserEntity } from '../models/user/user.entity';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
        custom: {
          role: 'ADMIN',
        },
      },
    },
  },
};
