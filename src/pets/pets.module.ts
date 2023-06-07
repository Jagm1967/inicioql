import { Module, forwardRef } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets.entity';
import { OwnersModule } from '../owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]),forwardRef(() =>OwnersModule)],
  exports:[PetsService],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
