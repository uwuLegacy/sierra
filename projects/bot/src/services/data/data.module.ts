import { Module } from '@nestjs/common';
import { PostgresService } from './postgres/postgres.service';

@Module({
    providers: [PostgresService],
})
export class DataManagementModule {}
