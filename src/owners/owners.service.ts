import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { Pet } from 'src/pets/pets.entity';
import { PetsService } from 'src/pets/pets.service';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  @Inject(forwardRef(() => PetsService)) private petsService:PetsService) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  findAll() {
    return this.ownersRepository.find();
  }

  findOne(id: number) {
    return this.ownersRepository.findOneByOrFail({ id: id });
  }

  async getPets(id:number):Promise<Pet[]>{
    return this.petsService.findOwner(id);
  }

}
