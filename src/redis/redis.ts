import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: new Redis({
        host: 'localhost',
        port: 6379,
      }),
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
