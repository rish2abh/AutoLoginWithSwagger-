import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as crypto from "crypto";
import AWS, { S3 } from "aws-sdk";
import { errorMessage } from "src/common/messages/error.message";
import { success } from "src/common/messages/success.message";

var bucket = process.env.AWS_BUCKET_NAME
@Injectable()
export class S3bucketService {




  async uploadFile(file) {
    try {
      const randomnum = crypto.randomUUID();

      const s3 = new S3();

      const response = await s3.upload({
        Bucket: bucket,
        Body: file.buffer,
        Key: `${randomnum}-${file.originalname}`,

      })
        .promise();

        return {Location:response.Location,
        key:response.Key};

    } catch (error) {

      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file to S3');
    }
  }
  // async getBucketfile(key) {
  //   try {
  //     const data = await this.S3bucketSchema.findOne({ key: key });

  //     if (!data) {
  //      return errorMessage.FILE_EXIST
  //     }

  //     return {
  //       message:success.SUCCESSFULLY_GET,
  //       file:data.fileurl
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving file from the database:', error);
  //     throw new NotFoundException('File not found in the database');
  //   }
  // }




  // async deletefile(key) {

  //   const s3 = new S3();

  //   const params = {
  //     Bucket: bucket,
  //     Key: key 
  //   }
  //   try {
  //     await s3.headObject(params).promise()
  //     console.log(params);

  //     console.log("File Found in S3")
  //     try {
  //       // await s3.deleteObject(params).promise()
  //       console.log("file deleted Successfully")
  //       await this.S3bucketSchema.findOneAndUpdate({ key: key },
  //           {isDeleted:true},
  //           {new:true})
  //       // await this.S3bucketSchema.findOneAndDelete({ key: key })
  //       return "file deleted succesfully"
  //     }
  //     catch (err) {
  //       console.log("ERROR in file Deleting : " + JSON.stringify(err))
  //     }
  //   } catch (err) {
  //     return ("File not Found ERROR : " + err.code)
  //   }
  // }

  async updatefile(key, file) {
    try {
      // Initialize AWS S3 client
      const s3 = new S3();


      // Retrieve the existing Excel file from S3
      const existingFile = await s3.getObject({ Bucket: bucket, Key: key }).promise();
      console.log(existingFile);

      // Upload the modified Excel back to S3
      
      const response = await s3.upload({
        Bucket: bucket, // Make sure 'bucket' is defined and contains the bucket name
        Body: file.buffer,
        Key: key,

      }).promise();

      console.log(response);

      return response.Location;
    } catch (error) {

      console.error('Error updating Excel file:', error);
      throw new BadRequestException('Failed to update Excel file');
    }

  }

}

