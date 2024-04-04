import mongoose from 'mongoose';
import {Moment} from 'moment';
import { ETokenType, EUserRole } from './auth.enum';
import { IUserDocument } from '../models';

export interface ICurrentUser extends IUserDocument {}

export interface ITokenPayload {
  id: mongoose.Schema.Types.ObjectId;
  role: EUserRole;
  expiryDate: Moment;
  type: ETokenType;
}
