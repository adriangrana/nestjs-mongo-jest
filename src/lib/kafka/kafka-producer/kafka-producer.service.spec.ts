import { Test, TestingModule } from '@nestjs/testing';
import { KafkaProducerService } from './kafka-producer.service';

describe('KafkaProducerService', () => {
  let service: KafkaProducerService;

  beforeEach(async () => {
    jest.setMock('kafkajs', { Kafka: { producer: jest.fn() } });
    service =new KafkaProducerService()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
