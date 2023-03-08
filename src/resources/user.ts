import { RoleEnum, UserEntity } from '../models/user/user.entity';

export const UserResource = {
  resource: UserEntity,
  options: {
    actions: {
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin.role === RoleEnum.ADMIN,
        isVisible: true,
      },
    },
  },
};
