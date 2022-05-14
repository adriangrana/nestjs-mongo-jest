import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';

@Module({
    providers: [KafkaConsumerService, KafkaProducerService],
    exports: [KafkaConsumerService, KafkaProducerService]
})
export class KafkaModule {}
