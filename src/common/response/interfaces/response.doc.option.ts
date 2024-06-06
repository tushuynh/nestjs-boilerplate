import { ClassConstructor } from 'class-transformer';

export interface ResponseDocOption<T> {
  statusCode?: number;
  isArray?: boolean;
  data?: ClassConstructor<T>;
}
