import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaProducerService } from 'src/lib/kafka/kafka-producer/kafka-producer.service';
import { KafkaConsumerService } from 'src/lib/kafka/kafka-consumer/kafka-consumer.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    readonly configService: ConfigService,
    private readonly producerService: KafkaProducerService,
    private readonly consumerService: KafkaConsumerService,
  ) {}

  private readonly topic = 'cenco.arcus.tasks.scored';
  private readonly topic_to_send = 'cenco.arcus.tasks.create';
  getHello(): string {
    this.producerService.produce({
      topic: this.topic_to_send,
      messages: [
        {
          value: Buffer.from(
            JSON.stringify({
              assinged_to: ['1ff7831e2743da2567ea93236e24465c'],
              _id: '62be2e7669585e278ecc0ec5',
              id: '154fdd9c-ce6d-4aec-b466-b4bb800bcb3e',
              task_number: '154fdd9c-ce6d-4aec-b466-b4bb800bcb3e',
              type: 'FOUNDRATEALERTS',
              country: 'CL',
              state: 'PENDING',
              category: '13',
              store: {
                _id: '62be2e7640295a6c3373343b',
                id: 'J514',
              },
              meta_data: {
                alert_id: '44f53bc1-5261-4d44-b67f-99ee6c5c54ae',
                origin: {
                  id: 'CS',
                  name: 'CornerShop',
                  image:
                    'https://arcus-api-task-image-staging.storage.googleapis.com/foundrate-alerts/origins/cl-cornershop.svg',
                  type: 'FOUNDRATEALERTS',
                },
                product: {
                  brand: 'TESA',
                  brand_code: '1223010016',
                  brand_type: 'No determinado',
                  brand_type_code: 'N/D',
                  description: 'CINTA DOBLE FAZ ESPEJOS 19MMX1.5MT TESA',
                  ean: '7808768200082',
                  category: '13',
                  stock_nrt: 11,
                  units_found: '0.000',
                  units_requested: '2.000',
                  article_number: '000000000000119919',
                  provider: 'TESA TAPE CHILE S.A.',
                  provider_code: '0001000017',
                  canasta: 'ND',
                  rub_desc: 'ADHESIVOS, SELLANTES Y CINTAS',
                  rubro: '1301',
                  hora: '18',
                  umv: 'UN',
                  date: '2022-06-30',
                },
              },
              created_at: '2022-06-30T23:15:02.031Z',
              updated_at: '2022-06-30T23:15:02.031Z',
              __v: 0,
            }),
          ),
        },
      ],
    });
    return this.configService.get('greeting_msg');
  }

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: this.topic },
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
