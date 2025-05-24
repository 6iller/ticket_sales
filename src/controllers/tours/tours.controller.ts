import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) {}


// @Get()
// getAllTours(): void {
//     this.toursService.generateTours();
// }
    @Post()
    initTours(): void {
        this.toursService.generateTours();
    }

// @Get()
// removeAllTours(@Param('remove')remove): void {
//     this.toursService.deleteTours();
// }

@Delete()
    removeAllTours(): void {
       this.toursService.deleteTours();
    }

}