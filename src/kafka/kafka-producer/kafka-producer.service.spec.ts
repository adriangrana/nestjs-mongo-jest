import { Test, TestingModule } from '@nestjs/testing';
import { KafkaServiceService } from './kafka-producer.service';

describe('KafkaServiceService', () => {
  let service: KafkaServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaServiceService],
    }).compile();

    service = module.get<KafkaServiceService>(KafkaServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
