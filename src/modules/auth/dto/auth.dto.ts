import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';
import { DoctorsEntity } from '../../doctors/entities/doctor.entity';

export class RegisterDto {
  @ApiProperty({ example: 'doctor@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '김의사' })
  @IsString()
  name: string;

  @ApiProperty({ example: '전문의' })
  @IsString()
  role: string;

  @ApiProperty({ example: '01012345678' })
  @IsPhoneNumber('KR')
  phone: string;

  @ApiProperty({ example: 'male' })
  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @ApiProperty({ example: '1980-01-01' })
  @IsDateString()
  dateOfBirth: Date;
}

export class LoginDto {
  @ApiProperty({ example: '01012345678' })
  @IsPhoneNumber('KR')
  phone: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: () => DoctorsEntity })
  doctor: DoctorsEntity;
}
