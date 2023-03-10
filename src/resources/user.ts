import { RoleEnum, UserEntity } from '../models/user/user.entity';
import { roleBasedAccessControl } from '../role-based-access-control';
import { ValidationError } from 'adminjs';

const validateForm = (request) => {
  const { payload = {}, method } = request;
  if (method !== 'post') return request;
  const { name = '' } = payload;

  if (name.trim().length === 0) {
    throw new ValidationError({ name: { message: 'Name is required' } });
  }
  return request;
};

export const UserResource = {
  resource: UserEntity,
  features: [roleBasedAccessControl],
  options: {
    actions: {
      new: {
        before: [validateForm],
      },
      edit: {
        before: [validateForm],
      },

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
