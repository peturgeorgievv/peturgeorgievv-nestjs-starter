import { Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT, REDIS_MAX_RETRY_DURATION } from './redis.constants';

type RedisRetryStrategyType = {
  delay: number | null;
  retryDuration: number;
};

export const redisRetryStrategy = (
  times: number,
  totalRetryDuration: number,
): RedisRetryStrategyType => {
  // Exponential backoff, cap at 30 seconds
  const delay = Math.min(1000 * 2 ** times, 30000);
  const currentRetryDuration = totalRetryDuration + delay;

  if (currentRetryDuration >= REDIS_MAX_RETRY_DURATION) {
    console.error(
      'REDIS: Stopping reconnection attempts. Max retry duration reached.',
    );
    return {
      delay: null,
      retryDuration: currentRetryDuration,
    };
  }

  console.log(
    `REDIS: connection retry, attempt ${times}, waiting for ${delay}ms`,
  );
  return {
    delay,
    retryDuration: currentRetryDuration,
  };
};

export const redisOptions = (): RedisOptions => {
  let totalRetryDuration = 0;

  return {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    showFriendlyErrorStack: true,
    lazyConnect: true,
    commandTimeout: 1000,
    retryStrategy: (times) => {
      const { delay, retryDuration } = redisRetryStrategy(
        times,
        totalRetryDuration,
      );
      totalRetryDuration = retryDuration;
      return delay;
    },
  };
};

@Module({
  imports: [],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        const client = new Redis(redisOptions());
        // Handling when redis server is down and the application starts
        client.on('error', function (e) {
          console.error(`REDIS: Error connecting: "${e}"`);
        });
        try {
          await client?.connect?.();
        } catch (error) {
          console.error(`REDIS: Failed to connect: ${error}`);
        }
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
