import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { authenticate } from './auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/user/user.module';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { UserEntity } from './models/user/user.entity';
import { dbOptions } from './database-connection';
import { ConfigModule } from '@nestjs/config';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbOptions()),
    UserModule,
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [UserEntity],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
})
export class AppModule {}
