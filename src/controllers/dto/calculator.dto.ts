export type calcData = {
  // TODO: use class-validator  https://docs.nestjs.com/techniques/validation

  // read https://docs.nestjs.com/microservices/guards#guards
  status: string;
  data: number;
  date_created: Date;
};
export type dbData = {
  param1: number;
  param2: number;
  result: number;
  date_created: Date;
  status: string;
};

// import {
//   IsString,
//   IsDefined,
//   IsNotEmpty,
//   ValidateNested,
//   IsNumberString,
//   IsBooleanString,
//   IsDate,
// } from 'class-validator';

export class CalcDto {
  // @IsString()
  operation: 'addition' | 'subtract' | 'multiply' | 'divide';

  // @IsString()
  param1: string;

  // @IsString()
  param2: string;
}

/*
  import { IsString, IsDefined, IsNotEmpty, ValidateNested, IsNumberString, IsBooleanString, IsDate } from 'class-validator'
  import { ApiModelProperty } from '@nestjs/swagger'
  export class ItemsRto {
      @IsNumberString()
      @IsDefined()
      @ApiModelProperty()
      readonly season_id: string
      @IsString()
      @IsDefined()
      @ApiModelProperty()
      @IsNotEmpty()
      readonly item_id: string
      @IsNumberString()
      @IsDefined()
      @ApiModelProperty()
      readonly league_id: string
      @IsNumberString()
      @IsDefined()
      @ApiModelProperty()
      readonly bucket_id: string
      @IsNumberString()
      @IsDefined()
      @ApiModelProperty()
      readonly scores: string
      constructor(params: Partial<ItemsRto>) {
          Object.assign(this, params)
      }
  }*/
