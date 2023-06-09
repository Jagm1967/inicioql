import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from '../owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>,
  @Inject(forwardRef(() => OwnersService)) private ownerService:OwnersService) {}

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

  async findOwner(ownerId:number):Promise<Pet[]>{
    return this.petsRepository.find({where:{ownerId:ownerId}});
  }

  async getOwner(ownerId:number):Promise<Owner>{
    return this.ownerService.findOne(ownerId);
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneByOrFail({ id: id });
  }
}
