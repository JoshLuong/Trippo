import 'dotenv/config';
import { Schema, model, Mongoose, ObjectId } from 'mongoose';

export interface IActivity {
  location: {
    lat: number,
    lng: number,
  },
  time?: Date,
  destination?: string,
  cost?: number,
  type?: string,
  comments: string[],
  suggested?: {
    destination: string,
    type: string,
    comments: string,
  }[],
}

export const activitySchema = new Schema<IActivity>({
  location: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  },
  time: Date,
  destination: String,
  cost: Number,
  type: String,
  comments: [String],
  suggested: [new Schema({
      destination: String,
      type: String,
      comments: String,
  })],
}, { toObject: { versionKey: false } });

export interface IUser {
  name: string,
  email: string,
  password: string,
}

export const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
}, { toObject: { versionKey: false } });

export interface IItinerary {
  user_id: ObjectId;
  name: string;
  budget?: number;
  current_cost?: number;
  contributers: {
    user_id: string;
    name: string;
  }[];
  comments?: string;
  tags?: string[];
  start_date: Date;
  end_date: Date;
}

export const itinerarySchema = new Schema<IItinerary>({
  user_id: Schema.Types.ObjectId,
  name: String,
  budget: Number,
  current_cost: Number,
  contributers: [new Schema({
    user_id: Schema.Types.ObjectId,
    name: String,
})],
  comments: String,
  tags: [String],
  start_date: Date,
  end_date: Date,
}, { toObject: { versionKey: false } });

export const User = model<IUser>('User', userSchema);

export const Itinerary = model<IItinerary>('Itinerary', itinerarySchema);

export const Activity = model<IActivity>('Activity', activitySchema);
