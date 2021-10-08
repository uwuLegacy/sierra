import { Module } from '@nestjs/common';
import { PostgresService } from './postgres/postgres.service';
import { RedisService } from './redis/redis.service';

@Module({
  providers: [PostgresService, RedisService]
})
export class DataManagementModule {}
