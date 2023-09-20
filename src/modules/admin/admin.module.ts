import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/user.schema';
import { CommonModule } from 'src/common/common.module';
import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';
import { ExcelTemplateSchema, excelTemplate } from 'src/Schema/excelTemplate';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: excelTemplate.name, schema: ExcelTemplateSchema },
    ]),
  ],
  providers: [AdminService, LoginService],
  controllers: [AdminController, LoginController],
})
export class AdminModule {}
