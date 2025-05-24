import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from 'src/schemas/tour';
import { ToursService } from 'src/services/tours/tours.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/costants';
import { JwtStrategyService } from 'src/services/authentification/jwt-strategy/jwt-strategy.service';

// @Module({
//   controllers: [ToursController]
// })
// export class ToursModule {}
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    PassportModule, 
    JwtModule.register ({
      secret: jwtConstants.secret
    })
  ],
  controllers: [ToursController],
  providers: [ToursService, JwtStrategyService], 
})
export class ToursModule {}