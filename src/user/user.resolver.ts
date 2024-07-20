import { Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import Redis from 'ioredis';
import { Inject } from '@nestjs/common';
import { REDIS_CLIENT, REDIS_KEYS } from '../redis/redis.constants';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
  ) {}

  @ResolveField(() => Int, { nullable: true })
  async rating() {
    const userId = 1;
    const rating = await this.redisClient.get(
      `${REDIS_KEYS.userRating}${userId}`,
    );
    return rating ? parseInt(rating, 10) : null;
  }

  @Query(() => [User], { nullable: true })
  async users() {
    const users = await this.dataSource.getRepository(User).find({});
    return users;
  }
}
