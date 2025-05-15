import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from 'src/schemas/tour';
import { ToursService } from 'src/services/tours/tours.service';

// @Module({
//   controllers: [ToursController]
// })
// export class ToursModule {}
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }])
  ],
  controllers: [ToursController],
  providers: [ToursService], // Добавьте ToursService
})
export class ToursModule {}