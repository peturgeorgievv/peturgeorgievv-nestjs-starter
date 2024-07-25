import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Project {
  @Field(() => ID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false })
  @Length(2, 55)
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;
}
