import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schema/user.schema';
import { LoginDTO } from 'src/common/dto/login';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/common/auth/auth.service';
import { errorMessage } from 'src/common/messages/error.message';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User.name) private userSchema : Model<UserDocument>,
        private authService : AuthService
    ){}

    async login(loginDTO: LoginDTO) {
        try {
            const userInfo = await this.userSchema.findOne({email:loginDTO.email})
            const isMatch = bcrypt.compareSync(loginDTO.password,userInfo.password)
            if(isMatch == false){
                throw new UnauthorizedException({success:false, message:errorMessage.UNAUTHORIZED});
            }
            const accessToken = await this.authService.createAccessToken(userInfo)
            const id = new mongoose.Types.ObjectId(userInfo._id);            
            await this.userSchema.findByIdAndUpdate(id,{
                $set:{
                    token:accessToken,
                    updatedAt:new Date()
                }
            })

            return{
                success:true,
                accessToken
            }

        } catch (error) {
            return{
                success:false,
                message:error.message
            }
        }
    }
}
