import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';

import { Profile, ProfileDocument } from '../../models/mongo/profile.model';

import { RegisterDto } from '../auth/dtos/register.dto';
import { AppRoles } from '../../config/app.roles';
import { PatchProfileDto } from './profile.dto';

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  get(id: string): Promise<Profile> {
    return this.profileModel.findById(id).exec();
  }

  getAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  getByUsername(username: string): Promise<Profile> {
    return this.profileModel.findOne({ username }).exec();
  }

  getByUsernameAndPass(username: string, password: string): Promise<Profile> {
    return this.profileModel
      .findOne({
        username,
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .exec();
  }

  async create(payload: RegisterDto): Promise<Profile> {
    const user = await this.getByUsername(payload.username);
    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }
    // this will auto assign the admin role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac('sha256', payload.password).digest('hex'),
      roles: AppRoles.ADMIN,
    });

    return createdProfile.save();
  }

  async edit(payload: PatchProfileDto): Promise<Profile> {
    const { username } = payload;
    const updatedProfile = await this.profileModel.updateOne(
      { username },
      payload,
    );
    if (updatedProfile.modifiedCount !== 1) {
      throw new BadRequestException(
        'The profile with that username does not exist in the system. Please try another username.',
      );
    }
    return this.getByUsername(username);
  }

  delete(username: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ username }).then((profile) => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${username} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the name of ${username}.`,
        );
      }
    });
  }
}
