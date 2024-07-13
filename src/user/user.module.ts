import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([User])],
  providers: [UserResolver],
})
export class UserModule {}
