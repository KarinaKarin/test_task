import { RoleEnum, UserEntity } from '../models/user/user.entity';
import { roleBasedAccessControl } from '../role-based-access-control';
import { ValidationError } from 'adminjs';
import uploadFeature from '@adminjs/upload';

const validateForm = (request) => {
  const { payload = {}, method } = request;
  if (method !== 'post') return request;
  const { name = '' } = payload;

  if (name.trim().length === 0) {
    throw new ValidationError({ name: { message: 'Name is required' } });
  }
  return request;
};

const localProvider = {
  bucket: 'public/photos',
  opts: {
    baseUrl: '/photos',
  },
};

export const UserResource = {
  resource: UserEntity,
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
      s3Key: {
        isVisible: false,
      },
      bucket: {
        isVisible: false,
      },
      mime: {
        isVisible: false,
      },
    },
  },
  features: [
    roleBasedAccessControl,
    uploadFeature({
      provider: { local: localProvider },
      properties: {
        file: 'photo',
        key: 's3Key',
        bucket: 'bucket',
        mimeType: 'mime',
      },
      validation: { mimeTypes: ['image/png', 'image/jpeg', 'image/webp'] },
    }),
  ],
};
