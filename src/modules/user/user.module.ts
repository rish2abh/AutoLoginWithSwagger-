import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ExcelTemplateSchema, excelTemplate } from "src/Schema/excelTemplate";

@Module({
    imports: [ MongooseModule.forFeature([
        { name: excelTemplate.name, schema: ExcelTemplateSchema },
      ]),],
    controllers: [UserController],
    providers: [UserService],
  })
  export class usermodule {}