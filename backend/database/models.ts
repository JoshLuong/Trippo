import 'dotenv/config';
import { Schema, model } from 'mongoose';

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

export interface IDay {
  activities: Schema.Types.ObjectId[],
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
});

export const daySchema = new Schema<IDay>({
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity',
  }],
});

export const Activity = model('Activity', activitySchema);
export const Day = model('Day', daySchema);
