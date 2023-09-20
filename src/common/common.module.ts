import { Module } from '@nestjs/common';
import 'dotenv/config'
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/user.schema';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { S3bucketService } from './services/s3.service';

@Module({
  imports: [ JwtModule.register({
    global: true,
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE },
  })
    ,MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  providers: [AuthService,S3bucketService],
  exports: [AuthService,S3bucketService]
})
export class CommonModule {}
