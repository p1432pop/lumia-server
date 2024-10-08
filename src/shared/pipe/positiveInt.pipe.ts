import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**value >= 0 */
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new BadRequestException('value must be greater than or equal 0');
    }
    return value;
  }
}
