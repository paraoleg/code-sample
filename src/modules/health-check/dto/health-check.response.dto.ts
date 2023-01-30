import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({ type: 'boolean' })
  everythingIsFine: boolean;
}
