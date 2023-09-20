import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import 'dotenv/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { usermodule } from './modules/user/user.module';

@Module({
  imports: [
    AdminModule,
    usermodule,
    MongooseModule.forRoot(process.env.MONGODB_LOCAL_URL)],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
