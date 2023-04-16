import { Controller, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, ITokenReturnBody } from './auth.service';
import { ProfileService } from '../profiles/profile.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

/**
 * Authentication Controller
 */
@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Login route to validate and create tokens for users
   * @param {LoginDto} payload the login dto
   */
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Login Completed',
    type: ITokenReturnBody,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginDto): Promise<ITokenReturnBody> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  /**
   * Registration route to create and generate tokens for users
   * @param {RegisterPayload} payload the registration dto
   */
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Registration Completed',
    type: ITokenReturnBody,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterDto): Promise<ITokenReturnBody> {
    const user = await this.profileService.create(payload);
    return await this.authService.createToken(user);
  }
}
