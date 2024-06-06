import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiResponseDto } from '../dtos/response.dto';
import { ResponseDocOption } from '../interfaces/response.doc.option';

export const ResponseDoc = <T>(
  options: ResponseDocOption<T>
): MethodDecorator => {
  const { statusCode = 200, isArray = false, data } = options;

  const docs = [];
  const schema: SchemaObject = {
    allOf: [{ $ref: getSchemaPath(ApiResponseDto) }],
    properties: {
      statusCode: {
        type: 'number',
        example: statusCode,
      },
    },
  };

  if (data) {
    docs.push(ApiExtraModels(data));
    schema.properties = {
      ...schema.properties,
      data: isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(data) },
          }
        : {
            type: 'object',
            $ref: getSchemaPath(data),
          },
    };
  }

  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiResponse({
      status: statusCode,
      schema,
    }),
    ...docs
  );
};
