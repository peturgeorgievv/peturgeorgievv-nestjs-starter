import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { Project } from './entities/project.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Project])],
})
export class ProjectModule {}
