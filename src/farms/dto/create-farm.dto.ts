import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateFarmDto {
  @ApiProperty({ example: "Greenhouse A" })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({ example: "Ratchaburi" })
  @IsOptional()
  @IsString()
  @MaxLength(240)
  location?: string;

  @ApiPropertyOptional({ example: "Somchai" })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  ownerName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
