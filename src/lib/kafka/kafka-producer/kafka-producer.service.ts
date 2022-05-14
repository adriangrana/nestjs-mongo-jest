import {  Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka ,ProducerRecord} from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
   
    private readonly kafkaClient = new Kafka({
        clientId: 'arcus-task-subscriber',
        brokers: [process.env.KAFKA_BROKERS_LIST],
     /*    sasl: {
            mechanism: 'plain',
            username: process.env.KAFKA_USERNAME,
            password: process.env.KAFKA_PASSWORD
          } */
        });
   
    private readonly producer = this.kafkaClient.producer();
    async onModuleInit() {

        try {
            await this.producer.connect();      
        } catch (error) {
            console.log(error.message);
            
        }
        
    }
    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }
    onApplicationShutdown(signal?: string) {
       this.producer.disconnect();
    }
  
}
