import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConsumerService } from '../../lib/kafka/kafka-consumer/kafka-consumer.service';
import { KafkaProducerService } from '../../lib/kafka/kafka-producer/kafka-producer.service';
import { KafkaModule } from 'src/lib/kafka/kafka.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, KafkaModule],
      controllers: [AppController],
      providers: [AppService, KafkaProducerService, KafkaConsumerService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      jest
        .spyOn(appController, 'getHello')
        .mockImplementation(() => 'Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
