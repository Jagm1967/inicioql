import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    /*     const pet = new Pet();
    pet.id = 1;
    pet.name = 'Amigo';
    return [pet]; */
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneByOrFail({ id: id });
  }
}