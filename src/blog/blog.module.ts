import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { BlogRepository } from './repositories/blog.repository';
import { BlogSchema } from './models/blog.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Blog',
                schema: BlogSchema
            }
        ]),
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogRepository],
    exports: [BlogService]
})
export class BlogModule { }
