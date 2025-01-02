import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageBuildingModel {
  @ApiProperty({
    type: String,
    example: '500',
    description: 'HTTP status code',
  })
  public code: string;

  @ApiProperty({
    type: String,
    example: 'Internal Server Error',
    description: 'Description of the error',
  })
  public error: string;

  @ApiProperty({
    type: String,
    example: 'An error occurred while processing your request',
    description: 'Error message',
  })
  public title: string;
}

export class ResponseBuildingModel<T> {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Whether the operation was successful',
  })
  public succeeded: boolean;

  @ApiProperty({
    type: Object,
    description: 'The response object generic type',
  })
  public result?: T;

  @ApiProperty({
    type: Object,
    description: 'The error object',
  })
  public error?: ErrorMessageBuildingModel;

  constructor(
    succeeded: boolean,
    result?: T,
    error?: ErrorMessageBuildingModel,
  ) {
    this.succeeded = succeeded;
    this.result = result;
    this.error = error;
  }
}
