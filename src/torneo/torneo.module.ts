import { Module } from '@nestjs/common';
import { TorneoService } from './torneo.service';
import { TorneoController } from './torneo.controller';
import { JugadorService } from '../jugador/jugador.service';
import { JugadorModule } from '../jugador/jugador.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Torneo, TorneoSchema } from './entities/torneo.entity';

@Module({
  controllers: [TorneoController],
  providers: [JugadorService,TorneoService],
  imports: [
    ConfigModule,
    JugadorModule,
    MongooseModule.forFeature([
      {
        name: Torneo.name,
        schema: TorneoSchema
      }
    ])
  
  ]
})
export class TorneoModule {}
