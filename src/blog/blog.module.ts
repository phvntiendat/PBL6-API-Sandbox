import { Module } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/models/user.model';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { BlogRepository } from './repositories/blog.repository';
import { BlogSchema } from './models/blog.model';
import { AppointmentSchema } from 'src/appointment/models/appointment.model';
import { RatingSchema } from 'src/rating/models/rating.model';
import { RatingRepository } from 'src/rating/repositories/rating.repository';
import { ScheduleSchema } from 'src/schedule/models/schedule.model';
import { ScheduleRepository } from 'src/schedule/repositories/schedule.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Blog',
                schema: BlogSchema
            },
            {
                name: 'User',
                schema: UserSchema
            },
            {
                name: 'Appointment',
                schema: AppointmentSchema
            },
            {
                name: 'Rating',
                schema: RatingSchema
            },
            {
                name: 'Schedule',
                schema: ScheduleSchema
            },
        ]),
        UserModule
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogRepository, UserService, UserRepository, RatingRepository, ScheduleRepository]
})
export class BlogModule { }
