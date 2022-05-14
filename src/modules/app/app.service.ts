import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(readonly configService: ConfigService) {}
  getHello(): string {
    return this.configService.get('greeting_msg');
  }
}
