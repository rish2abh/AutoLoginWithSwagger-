import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ExcelFilePipe implements PipeTransform {
  transform(file: any) {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new BadRequestException('Invalid file type. Please upload an Excel file.');
    }else if (file.mimetype == undefined){

    throw new BadRequestException('Please upload an Excel file.');
    }

    return file;
  }
}