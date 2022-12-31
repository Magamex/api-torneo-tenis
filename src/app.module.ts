import { Module } from '@nestjs/common';
import { JugadorModule } from './jugador/jugador.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule } from '@nestjs/config';
import { TorneoModule } from './torneo/torneo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    JugadorModule,
    TorneoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
