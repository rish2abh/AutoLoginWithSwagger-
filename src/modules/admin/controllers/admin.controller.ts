import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { UserDTO, User_Edit_DTO } from 'src/common/dto/user';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { RoleGuard } from 'src/common/auth/guards/role.guard';
import { Roles } from 'src/Schema/user.schema';
import { addExcelDto, editExcelDto } from 'src/common/dto/addExcel';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ExcelFilePipe } from 'src/common/pipes/checkexcel';
import { excelTemplate } from 'src/Schema/excelTemplate';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminResponse } from 'src/common/doc/Decorator/response.Decorator';
@ApiTags('admin')
@Controller('admin')
// @UseGuards(AuthGuard, new RoleGuard(Roles.SUPER_ADMIN))
export class AdminController {
  constructor(
    @InjectModel(excelTemplate.name) private excelSchema: Model<excelTemplate>,
    private adminService: AdminService,
  ) {}

  @Post('addUser')
  @AdminResponse('addUser')
  addUser(@Body() userDTO: UserDTO) {
    return this.adminService.addUser(userDTO);
  }

  @Put('editUserProfile')
  @AdminResponse('editUserProfile')
  editUserProfile(@Body() editUser: User_Edit_DTO) {
    return this.adminService.editUser(editUser);
  }

  @Post('addExcel')
  @UseInterceptors(FileInterceptor('file'))
  @AdminResponse('addExcel')
  addExcel(
    @UploadedFile(ExcelFilePipe) file: Express.Multer.File,
    @Body() body: addExcelDto,
  ) {
    return this.adminService.exceltemp(file, body);
  }

  @Patch('editExcel')
  @UseInterceptors(FileInterceptor('file'))
  @AdminResponse('editExcel')
  async editExcel(
    @Body() body: editExcelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (
      file &&
      file?.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException(
        'Invalid file type. Please upload an Excel file.',
      );
    }

    return this.adminService.editExcel(file, body);
  }
}
