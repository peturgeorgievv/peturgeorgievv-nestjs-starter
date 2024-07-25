import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    GraphqlModule,
    DbModule,
    UserModule,
    ProjectModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCH: Joi.string().default('false'),
        DB_LOG: Joi.string().default('false'),
        NAMESPACE: Joi.string().required(),
      }),
      validationOptions: { abortEarly: true },
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
