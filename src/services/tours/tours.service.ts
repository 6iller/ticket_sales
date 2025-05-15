import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from '../../schemas/tour';
import { ITour } from '../../interfaces/tour';
// import { CreateTourDto } from './dto/create-tour.dto';
// import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  async create(createTourDto: any): Promise<Tour> { // Замените any на DTO
    const createdTour = new this.tourModel(createTourDto);
    return createdTour.save();
  }

  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }

  async findOne(id: string): Promise<Tour> { // id здесь Mongoose _id
    const tour = await this.tourModel.findById(id).exec();
    if (!tour) {
      throw new NotFoundException(`Tour with _id ${id} not found`);
    }
    return tour;
  }

  async update(id: string, updateTourDto: any): Promise<Tour> { // id здесь Mongoose _id, Замените any на DTO
    const updatedTour = await this.tourModel.findByIdAndUpdate(id, updateTourDto, { new: true }).exec();
    if (!updatedTour) {
      throw new NotFoundException(`Tour with _id ${id} not found for update`);
    }
    return updatedTour;
  }

  async remove(id: string): Promise<Tour> { // id здесь Mongoose _id
    const deletedTour = await this.tourModel.findByIdAndDelete(id).exec();
     if (!deletedTour) {
      throw new NotFoundException(`Tour with _id ${id} not found for deletion`);
    }
    return deletedTour;
  }
}