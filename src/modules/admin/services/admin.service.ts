import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Roles, User, UserDocument } from 'src/Schema/user.schema';
import { UserDTO, User_Edit_DTO } from 'src/common/dto/user';
import { errorMessage } from 'src/common/messages/error.message';
import { success } from 'src/common/messages/success.message';
import * as bcrypt from 'bcrypt'
import 'dotenv/config'
import { excelTemplate } from 'src/Schema/excelTemplate';
import { S3 } from 'aws-sdk';
import { S3bucketService } from 'src/common/services/s3.service';
import { editExcelDto } from 'src/common/dto/addExcel';

var bucket = process.env.AWS_BUCKET_NAME

@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name) private userSchema : Model<UserDocument>,
                @InjectModel(excelTemplate.name) private excelSchema : Model<excelTemplate>,
                private readonly S3bucketService:S3bucketService){}

    async addUser(userDTO : UserDTO){
        try {
            const isValid = await this.userSchema.findOne({email:userDTO.email})
            if(isValid){
                return{
                    success : false,
                    message: errorMessage.EMAIL_EXIST
                }
            }
            const hash = bcrypt.hashSync(userDTO.password, bcrypt.genSaltSync(10));
            userDTO.password = hash
            
            await this.userSchema.create({
                ...userDTO,
                isActive:true,
                role:Roles.USER
            })

            return{
                success:true,
                message:success.SUCCESSFULLY_REG
            }
        } catch (error) {
            return{
                success:false,
                message: error.message ?? errorMessage.ON_CONFLICT
            }
        }
    }

    async editUser(editUserDTO : User_Edit_DTO){
        try {
            if(editUserDTO.password){
                const hash = bcrypt.hashSync(editUserDTO.password, bcrypt.genSaltSync(10));
                editUserDTO.password = hash
            }
            const _id = new mongoose.Types.ObjectId(editUserDTO.id);
            await this.userSchema.findByIdAndUpdate(_id,{
                $set:{
                    ...editUserDTO,
                    updatedAt:new Date()
                }
            })
            
            return{
                success:true,
                message:success.SUCCESSFULLY_UPDATE
            }
        } catch (error) {
            return{
                success:false,
                message: error.message ?? errorMessage.ON_CONFLICT
            }
        }
    }


    async exceltemp(file,AddExcelDto){

        try {
           const urlpath=await this.S3bucketService.uploadFile(file)
           console.log(urlpath,"khhhkhk");
           
            const addData = await this.excelSchema.create({ ...AddExcelDto,
                urlLimit : urlpath.Location , key : urlpath.key});
            return{
                success:true,
                message:success.SUCCESSFULLY_UPL,
                data : addData
            }
        } catch (error) {
            return{
                success:false,
                message: error.message ?? errorMessage.ON_CONFLICT
            }
        }
    }

    async editExcel(file,editExcelDto:editExcelDto){
        try{
             
            console.log("hello");
 
            if(file){

                const urlpath=await this.S3bucketService.updatefile(editExcelDto.key,file)
                editExcelDto.urlLimit = urlpath
                const updatefile = await this.excelSchema.findByIdAndUpdate(editExcelDto.id,{$set:{...editExcelDto}},{new:true})
                console.log(updatefile,"updated");
                
                 
        return{
            success:true,
            message:success.SUCCESSFULLY_UPL,
            data : updatefile
        }
            }
              
                
                const updatefile = await this.excelSchema.findByIdAndUpdate(editExcelDto.id,{$set:{...editExcelDto}},{new:true})
                console.log(updatefile,"fsfs");
                
                 
        return{
            success:true,
            message:success.SUCCESSFULLY_UPL,

            data : updatefile
        
            }
          


       
    } catch (error) {
        return{
            success:false,
            message: error.message ?? errorMessage.ON_CONFLICT
        }
    }
}













    }
