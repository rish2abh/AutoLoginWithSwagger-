import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { UserResponse } from "src/common/doc/Decorator/response.Decorator";

@ApiTags('user')
@Controller('user')
export class UserController {
    
   constructor(private readonly userservice:UserService){}

   @Get("excelField")
   @UserResponse("excelField")
   getExcelData(){
      return this.userservice.getExcelData()
   }
}
