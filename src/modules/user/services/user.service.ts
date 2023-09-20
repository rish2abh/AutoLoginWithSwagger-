import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { excelTemplate } from "src/Schema/excelTemplate";
import { success } from "src/common/messages/success.message";

@Injectable()
export class UserService{
    constructor(@InjectModel(excelTemplate.name) private excelSchema : Model<excelTemplate>){}

    async getExcelData(){
        try {
            const data =  await this.excelSchema.find({isShow: true},{name:1,  urlLimit : 1,isActive:1})
            return{
                success:true,
                message:success.SUCCESSFULLY_GET,
                data : data,
            }
        } catch (error) {
            console.log(error.message);
            
        }
        
    }
}