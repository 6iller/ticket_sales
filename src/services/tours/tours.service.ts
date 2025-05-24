import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from '../../schemas/tour';
import { ITour } from '../../interfaces/tour';
import { TourDto } from 'src/dto/tour-dto';

@Injectable()
export class ToursService {

  private toursCount = 10;
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  generateTours(): void {
    for (let i=-0; i<=this.toursCount; i++) {
      const tour = new TourDto('test'+i, 'test desc', 'test operator', '300'+i)
      const tourData=new this.tourModel(tour);
      tourData.save();
    }
  }

  async deleteTours(): Promise<any> {
    return this.tourModel.deleteMany({})
  }

  async create(createTourDto: any): Promise<Tour> { 
    const createdTour = new this.tourModel(createTourDto);
    return createdTour.save();
  }

  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }

  async findOne(id: string): Promise<Tour> { 
    const tour = await this.tourModel.findById(id).exec();
    if (!tour) {
      throw new NotFoundException(`Tour with _id ${id} not found`);
    }
    return tour;
  }

  async update(id: string, updateTourDto: any): Promise<Tour> { 
    const updatedTour = await this.tourModel.findByIdAndUpdate(id, updateTourDto, { new: true }).exec();
    if (!updatedTour) {
      throw new NotFoundException(`Tour with _id ${id} not found for update`);
    }
    return updatedTour;
  }

  async remove(id: string): Promise<Tour> { 
    const deletedTour = await this.tourModel.findByIdAndDelete(id).exec();
     if (!deletedTour) {
      throw new NotFoundException(`Tour with _id ${id} not found for deletion`);
    }
    return deletedTour;
  }
}