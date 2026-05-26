import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GrowthStage } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class CreateGrowthLogDto {
  @ApiProperty()
  @IsUUID()
  cropCycleId: string;

  @ApiProperty({ enum: GrowthStage })
  @IsEnum(GrowthStage)
  stage: GrowthStage;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  loggedAt?: Date;

  @ApiPropertyOptional({ example: 45.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  heightCm?: number;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  leafCount?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  fruitCount?: number;

  @ApiPropertyOptional({ example: 29.4 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  temperatureC?: number;

  @ApiPropertyOptional({ example: 72.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  humidityPercent?: number;

  @ApiPropertyOptional({ example: 6.3 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ph?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
