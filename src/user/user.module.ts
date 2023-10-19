import { ScheduleModule } from 'src/schedule/schedule.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { BlogModule } from 'src/blog/blog.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { MentorController } from './controllers/mentor.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { BlogSchema } from 'src/blog/models/blog.model';
import { AppointmentSchema } from 'src/appointment/models/appointment.model';
import { ScheduleSchema } from 'src/schedule/models/schedule.model';
import { RatingSchema } from 'src/rating/models/rating.model';
import { BlogService } from 'src/blog/services/blog.service';
import { RatingService } from 'src/rating/services/rating.service';
import { ScheduleService } from 'src/schedule/services/schedule.service';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { RatingModule } from 'src/rating/rating.module';
import { BlogRepository } from 'src/blog/repositories/blog.repository';
import { RatingRepository } from 'src/rating/repositories/rating.repository';
import { AppointmentRepository } from 'src/appointment/repositories/appointment.repository';
import { ScheduleRepository } from 'src/schedule/repositories/schedule.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            }
        ]),

        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRETKEY'),
                signOptions: {
                    expiresIn: configService.get('EXPIRESIN'),
                },
            }),
            inject: [ConfigService]
        }),

    ],

    controllers: [AuthController, UserController, MentorController],
    providers: [UserService, AuthService, UserRepository, JwtStrategy, BlogService, ScheduleService, RatingService],
    exports: [UserService]

})
export class UserModule { }
