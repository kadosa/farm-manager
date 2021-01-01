import { Injectable } from '@nestjs/common';
import { Chicken } from '../chicken.interface';
@Injectable()
export class ChickensService {
  private readonly chickens: Chicken[] = [];

  create(chicken: Chicken) {
    this.chickens.push(chicken);
  }

  findAll(): Chicken[] {
    return this.chickens;
  }
}
