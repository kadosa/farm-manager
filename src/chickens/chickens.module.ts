import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ChickensController } from './chickens.controller';
import { ChickensService } from './chickens.service';
import { logger } from '../logger.middleware';
@Module({
  controllers: [ChickensController],
  providers: [ChickensService],
})
export class ChickensModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(ChickensController);
  }
}
