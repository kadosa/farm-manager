import { Test, TestingModule } from '@nestjs/testing';
import { ChickensController } from './chickens.controller';

describe('ChickensController', () => {
  let controller: ChickensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChickensController],
    }).compile();

    controller = module.get<ChickensController>(ChickensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
