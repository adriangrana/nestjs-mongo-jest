import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { HealthController } from '../../health/health.controller';
import { HealthModule } from '../../health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import configuration from '../../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from '../../kafka/kafka.module';
import { KafkaProducerService } from 'src/kafka/kafka-producer/kafka-producer.service';
import { KafkaConsumerService } from 'src/kafka/kafka-consumer/kafka-consumer.service';

@Module({
  imports: [
    UserModule,
    TerminusModule,
    HealthModule,
    KafkaModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, KafkaProducerService, KafkaConsumerService],
})
export class AppModule {}
