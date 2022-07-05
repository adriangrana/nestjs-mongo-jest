import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerSubscribeTopic } from '@nestjs/microservices/external/kafka.interface';
import { Consumer, ConsumerRunConfig, Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly kafkaClient = new Kafka({
    clientId: 'arcus-task-subscriber',
    brokers: [process.env.KAFKA_BROKERS_LIST],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  });
  private readonly consumer: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.kafkaClient.consumer({
      groupId: 'cenco.arcus.products.print-production',
    });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumer.push(consumer);
  }

  onApplicationShutdown(signal?: string) {
    for (const consumer of this.consumer) {
      consumer.disconnect();
    }
  }
}
