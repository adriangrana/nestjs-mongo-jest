
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
        () => this.http.pingCheck('tcp', 
        {
            transport: Transport.TCP,
            options: { host: 'localhost', port: 3000 },
        }),
    ]);
  }
}