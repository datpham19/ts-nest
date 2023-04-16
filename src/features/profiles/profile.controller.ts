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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService, IGenericMessageBody } from './profile.service';
import { PatchProfileDto } from './profile.dto';
import { Profile } from '../../models/mongo/profile.model';

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiTags('profile')
@Controller('api/profile')
export class ProfileController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Retrieves a particular profile
   * @param username the profile given username to fetch
   * @returns {Promise<Profile>} queried profile data
   */
  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Fetch Profile Request Received',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getProfile(@Param('username') username: string): Promise<Profile> {
    const profile = await this.profileService.getByUsername(username);
    if (!profile) {
      throw new BadRequestException(
        'The profile with that username could not be found.',
      );
    }
    return profile;
  }

  /**
   * Edit a profile
   * @param {RegisterDto} payload
   * @returns {Promise<Profile>} mutated profile data
   */
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Patch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Patch Profile Request Failed' })
  async patchProfile(@Body() payload: PatchProfileDto) {
    return await this.profileService.edit(payload);
  }

  /**
   * Removes a profile from the database
   * @param {string} username the username to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the profile has been deleted
   */
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
