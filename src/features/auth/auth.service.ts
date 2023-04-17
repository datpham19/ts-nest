import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ProfileService } from '../profiles/profile.service';
import { Profile } from '../../models/mongo/profile.model';
import { LoginDto } from './dtos/login.dto';
import { ConfigService } from '../../config/config.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

/**
 * Models a typical Login/Register route return body
 */
@ApiTags('auth')
export class ITokenReturnBody {
  @ApiProperty({
    example: '3600',
    description: 'When the token is to expire in seconds',
  })
  expires: string;
  @ApiProperty({ example: 'token', description: 'The JWT token' })
  token: string;
}

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  /**
   * Time in seconds when the token is to expire
   * @type {string}
   */
  private readonly expiration: string;

  /**
   * Constructor
   * @param {JwtService} jwtService jwt service
   * @param {ConfigService} configService
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    this.expiration = this.configService.get('WEBTOKEN_EXPIRATION_TIME');
  }

  /**
   * Creates a signed jwt token based on Profile payload
   * @param {Profile} param dto to generate token from
   * @returns {Promise<ITokenReturnBody>} token body
   */
  async createToken({
    _id,
    username,
    email,
  }: Profile): Promise<ITokenReturnBody> {
    return {
      expires: this.expiration,
      token: this.jwtService.sign({ _id, username, email }),
    };
  }

  /**
   * Formats the time in seconds into human-readable format
   * @param {string} time
   * @returns {string} hrf time
   */
  private static prettyPrintSeconds(time: string): string {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} ${
      minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''
    } ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
  }

  /**
   * Validates whether or not the profile exists in the database
   * @param {LoginDto} payload login payload to authenticate with
   * @returns {Promise<Profile>} registered profile
   */
  async validateUser(payload: LoginDto): Promise<Profile> {
    const user = await this.profileService.getByUsernameAndPass(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Could not authenticate. Please try again.',
      );
    }
    return user;
  }
}
