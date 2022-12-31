import { Module } from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Jugador, JugadorSchema } from './entities/jugador.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [JugadorController],
  providers: [JugadorService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Jugador.name,
        schema: JugadorSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class JugadorModule {}
