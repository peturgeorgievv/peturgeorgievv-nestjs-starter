import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  @Index()
  @MinLength(5)
  email: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  @Length(2, 55)
  firstName: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'varchar', nullable: false })
  @Length(2, 55)
  lastName: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
