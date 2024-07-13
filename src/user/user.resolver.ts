import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => [User], { nullable: true })
  async users() {
    const users = await this.dataSource.getRepository(User).find({});
    return users;
  }
}
