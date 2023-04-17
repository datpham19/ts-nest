import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiUnprocessableEntityResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProfileService, IGenericMessageBody } from './profile.service';
import { PatchProfileDto } from './profile.dto';
import { Profile } from '../../models/mongo/profile.model';
import { ApiHeaders } from '../../config/swagger';

@ApiBearerAuth()
@ApiTags('profiles')
@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiHeaders()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all profile' })
  @ApiResponse({
    status: 200,
    description: 'Fetch Profile Request Received',
    type: Array<Profile>,
  })
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse({
    description: 'Fetch Profile Request Failed',
  })
  async getProfiles(): Promise<Profile[]> {
    return await this.profileService.getAll();
  }

  @Get(':username')
  @ApiHeaders()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Fetch Profile Request Received',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getProfile(@Param('username') username?: string): Promise<Profile> {
    const profile = await this.profileService.getByUsername(username);
    if (!profile) {
      throw new BadRequestException(
        'The profile with that username could not be found.',
      );
    }
    return profile;
  }

  @Patch(':username')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Patch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Patch Profile Request Failed' })
  async patchProfile(
    @Body() payload: PatchProfileDto,
    @Param('username') username: string,
  ) {
    return await this.profileService.edit(payload);
  }

  @Delete(':username')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Delete Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Delete Profile Request Failed' })
  async delete(
    @Param('username') username: string,
  ): Promise<IGenericMessageBody> {
    return await this.profileService.delete(username);
  }
}
