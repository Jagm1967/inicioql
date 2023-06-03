import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HolaMundoResolver {
  @Query(() => String)
  holaMundo(): string {
    return 'Hola mundo';
  }

  @Query(() => Number)
  getNumeroAleatorio(): number {
    return Math.random() * 100;
  }
  @Query(() => Int, {
    name: 'numeroAleatorioHasta',
    description:
      'Genera un entero aleatorio con el argumento hasta (por defecto 5)',
  })
  getNumeroAleatorioHasta(
    @Args('hasta', { nullable: true, type: () => Int }) hasta = 5,
  ) {
    return Math.floor(Math.random() * hasta);
  }
}
