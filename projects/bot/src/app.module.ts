import { Module } from '@nestjs/common';
import { AppImports } from './common/imports/app.imports';

@Module({
    imports: AppImports,
})
export class AppModule {}
