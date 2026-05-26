import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CropCycleStatus } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from "class-validator";

export class CreateCropCycleDto {
  @ApiProperty()
  @IsUUID()
  farmId: string;

  @ApiProperty({ example: "Melon batch 2026-05" })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({ example: "Green Net" })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  variety?: string;

  @ApiPropertyOptional({ enum: CropCycleStatus })
  @IsOptional()
  @IsEnum(CropCycleStatus)
  status?: CropCycleStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expectedHarvestAt?: Date;

  @ApiPropertyOptional({ example: 120 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  plantsCount?: number;

  @ApiPropertyOptional({ example: 64.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  areaSqm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
