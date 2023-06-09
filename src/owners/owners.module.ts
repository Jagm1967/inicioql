import { Module, forwardRef } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Owner]),forwardRef(() =>PetsModule)],
  exports: [OwnersService],
  providers: [OwnersResolver, OwnersService]
})
export class OwnersModule {}
