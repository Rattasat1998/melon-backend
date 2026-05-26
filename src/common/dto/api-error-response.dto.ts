import { ApiProperty } from "@nestjs/swagger";

export class ApiErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: "Not Found" })
  error: string;

  @ApiProperty({
    oneOf: [
      { type: "string", example: "Crop cycle not found" },
      {
        type: "array",
        items: { type: "string" },
        example: ["name must be shorter than or equal to 120 characters"],
      },
    ],
  })
  message: string | string[];

  @ApiProperty({ example: "/crop-cycles/unknown-id" })
  path: string;

  @ApiProperty({ example: "2026-05-26T14:20:00.000Z" })
  timestamp: string;
}
