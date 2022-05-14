import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaConsumerService } from '../../kafka/kafka-consumer/kafka-consumer.service';
import { KafkaProducerService } from '../../kafka/kafka-producer/kafka-producer.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    readonly configService: ConfigService,
    private readonly producerService: KafkaProducerService,
    private readonly consumerService: KafkaConsumerService,
  ) {}

  getHello(): string {
    this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'Hello World!',
        },
      ],
    });
    return this.configService.get('greeting_msg');
  }

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'test' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            topic,
            partition,
            offset: message.offset,
            value: message.value.toString(),
          });
        },
      },
    );
  }
}
