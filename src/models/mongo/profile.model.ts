import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AppRoles } from '../../config/app.roles';
import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';

/**
 * Mongoose Profile Schema
 */
// export const Profile = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   name: { type: String, required: true },
//   password: { type: String, required: true },
//   avatar: { type: String, required: true },
//   roles: [{ type: String }],
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @ApiProperty({
    description: 'MongoDB ObjectID',
    required: false,
    example: '5f9f1c9c9c9c9c9c9c9c9c9c',
  })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  readonly username: string;

  @Prop({ required: true })
  @ApiProperty()
  readonly email: string;

  @Prop({ required: true })
  @ApiProperty()
  readonly name: string;

  @Prop({ required: true })
  @ApiProperty()
  password: string;

  @Prop({ required: true })
  @ApiProperty()
  readonly roles: AppRoles;

  @Prop({ required: false, default: Date.now })
  @ApiProperty()
  readonly date: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
