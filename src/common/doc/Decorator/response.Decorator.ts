import { applyDecorators } from '@nestjs/common';
import { AdminEndPoint, UserEndPoint } from '../interface/EndPoint.Response';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

export function AdminResponse(endpoint: string) {
  if (AdminEndPoint.ADMIN_ADD_USER === endpoint) {
    return applyDecorators(
      ApiResponse({
        status: 201,
        schema: {
          example: {
            success: true,
            message: 'registered successfully',
          },
        },
      }),
      ApiResponse({
        status: 401,
        schema: {
          example: {
            success: false,
            message: 'unauthorized',
          },
        },
      }),
      ApiResponse({
        status: 422,
        schema: {
          example: {
            success: false,
            error: 'Unprocessable Entity',
            message: ['Any should not be empty'],
          },
        },
      }),
    );
  }
  if (AdminEndPoint.ADMIN_LOGIN === endpoint) {
    return applyDecorators(
      ApiResponse({
        status: 201,
        schema: {
          example: {
            success: true,
            accessToken: 'token',
          },
        },
      }),
      ApiResponse({
        status: 422,
        schema: {
          example: {
            success: false,
            error: 'Unprocessable Entity',
            message: ['password must be a string'],
          },
        },
      }),
    );
  }
  if (AdminEndPoint.ADMIN_EDITUSERPROFILE === endpoint) {
    return applyDecorators(
      ApiResponse({
        status: 200,
        schema: {
          example: {
            success: true,
            message: 'update successfully',
          },
        },
      }),
      ApiResponse({
        status: 401,
        schema: {
          example: {
            success: false,
            message: 'unauthorized',
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: 'Unexpected token } in JSON at position 62',
            error: 'Bad Request',
          },
        },
      }),
    );
  }
  if (AdminEndPoint.ADMIN_ADD_EXCEL === endpoint) {
    return applyDecorators(
      ApiConsumes('multipart/form-data'),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            path: { type: 'integer' },
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        schema: {
          example: {
            success: true,
            message: 'uploaded successfully',
            data: {
              name: 'Internal Inspection',
              urlLimit:
                'https://tracenet.s3.amazonaws.com/e336be74-fddc-4502-9ce2-17d020526def-Add_Brand_From_Seeder_Demo.xlsx',
              path: 'ghf',
              isActive: true,
              isShow: true,
              key: 'e336be74-fddc-4502-9ce2-17d020526def-Add_Brand_From_Seeder_Demo.xlsx',
              _id: '650197f404dc962357610e5b',
              createdAt: '2023-09-13T11:07:32.498Z',
              updatedAt: '2023-09-13T11:07:32.498Z',
              __v: 0,
            },
          },
        },
      }),
      ApiResponse({
        status: 401,
        schema: {
          example: {
            success: false,
            message: 'Unauthorized',
          },
        },
      }),
      ApiResponse({
        status: 422,
        schema: {
          example: {
            success: false,
            error: 'Unprocessable Entity',
            message: ['password must be a string'],
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: 'Invalid file type. Please upload an Excel file.',
            error: 'Bad Request',
          },
        },
      }),
    );
  }
  if (AdminEndPoint.ADMIN_EDIT_EXCEL === endpoint) {
    return applyDecorators(
      ApiConsumes('multipart/form-data'),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            key: { type: 'string' },
            name: { type: 'string' },
            path: { type: 'integer' },
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        schema: {
          example: {
            success: true,
            message: 'uploaded successfully',
            data: {
              _id: '650197f404dc962357610e5b',
              name: 'Internal Inspection',
              urlLimit:
                'https://tracenet.s3.ap-south-1.amazonaws.com/e336be74-fddc-4502-9ce2-17d020526def-Add_Brand_From_Seeder_Demo.xlsx',
              path: 'http://internalInspection',
              isActive: true,
              isShow: true,
              key: 'e336be74-fddc-4502-9ce2-17d020526def-Add_Brand_From_Seeder_Demo.xlsx',
              createdAt: '2023-09-13T11:07:32.498Z',
              updatedAt: '2023-09-13T11:27:08.726Z',
              __v: 0,
            },
          },
        },
      }),
      ApiResponse({
        status: 401,
        schema: {
          example: {
            success: false,
            message: 'Unauthorized',
          },
        },
      }),
      ApiResponse({
        status: 422,
        schema: {
          example: {
            success: false,
            error: 'Unprocessable Entity',
            message: ['path should not be empty'],
          },
        },
      }),
      ApiResponse({
        status: 400,
        schema: {
          example: {
            message: 'Invalid file type. Please upload an Excel file.',
            error: 'Bad Request',
          },
        },
      }),
    );
  }
}

export function UserResponse(endpoint: string) {
  if (UserEndPoint.USER_EXCEL_FIELD === endpoint) {
    return applyDecorators(
      ApiResponse({
        status: 200,
        schema: {
          example: {
            success: true,
            message: 'successfully fetched',
            data: [
              {
                _id: '65000ebe0441e791b997dba9',
                name: 'Farmer Registration',
                urlLimit:
                  'https://tracenet.s3.amazonaws.com/51085e7e-fc80-43b5-b3b4-1629a948e170-Add_Brand_From_Seeder_Demo.xlsx',
                isActive: true,
              },
              {
                _id: '6500392fec85e988364f06a8',
                name: 'Internal Inspection',
                urlLimit:
                  'https://tracenet.s3.amazonaws.com/ecef8d31-03ec-4479-9060-693a8f85f099-Add_Brands%20-%202023-07-19T164143.782%20%281%29.xlsx',
                isActive: true,
              },
            ],
          },
        },
      }),
    );
  }
}
