import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HolaMundoModule } from './hola-mundo/hola-mundo.module';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';
import { ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './datos',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    HolaMundoModule,
    PetsModule,
    OwnersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
