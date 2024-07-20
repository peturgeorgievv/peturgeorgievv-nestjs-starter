export const REDIS_CLIENT = 'REDIS_CLIENT';

export const REDIS_KEYS = {
  userRating: 'user:rating:',
};

export const REDIS_MAX_RETRY_DURATION = 5 * 60 * 1000; // 5 minutes is enough for the redis server to restart
