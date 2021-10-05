import { Injectable } from '@nestjs/common';
import { Enumerable } from '@sapphire/decorators';
import { SapphireClient } from '@sapphire/framework';

@Injectable()
export class ClientService extends SapphireClient {
    @Enumerable(false)
    public __dev__ = process.env.NODE_ENV !== 'production';

    public build() {
      
    }
}
