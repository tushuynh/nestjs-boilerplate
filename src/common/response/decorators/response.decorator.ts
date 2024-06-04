import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse as ApiResponseSwagger,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDto } from '../dtos/response.dto';

export const ApiResponse = <GenericType extends Type<unknown>>(
  statusCode: number,
  typeData: GenericType,
  isArray = false
): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto, typeData),
    ApiResponseSwagger({
      description: `The result of ${typeData.name}`,
      status: statusCode,
      schema: {
        allOf: [{ $ref: getSchemaPath(ApiResponseDto) }],
        properties: {
          statusCode: {
            type: 'number',
            example: statusCode,
          },
          data: isArray
            ? {
                type: 'array',
                items: { $ref: getSchemaPath(typeData) },
              }
            : {
                type: 'object',
                $ref: getSchemaPath(typeData),
              },
        },
      },
    })
  );
};
