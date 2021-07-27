import 'dotenv/config';
import { Schema, model, ObjectId } from 'mongoose';

export interface IYelp {
  name: string;
  business_id: string;
  url: string;
  rating: number;
  price?: string;
  distance: number;
  comments: string;
}

export const yelpSchema = new Schema<IYelp>({
  expire_at: {type: Date, default: Date.now, expires: '24h'} ,
  name: String,
  business_id: {
    type: String,
    unique: true // `email` must be unique
  },
  url:String,
  rating: Number,
  price: String,
  distance: Number,
  comments: String,
}, { toObject: { versionKey: false } });
export interface IActivity {
  location: {
    lat: number;
    lng: number;
  };
  time?: Date;
  destination?: string;
  cost?: number;
  type?: string;
  comments: string[];
  business_ids: string[]
  suggested?: {
    // TODO DELETE
    destination: string;
    type: string;
    url: string;
    rating: number;
    price?: string;
    distance: number;
    comments: string;
  }[];
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
  business_ids: [String],
  suggested: [new Schema({
    destination: String,
    type: String,
    comments: String,
    url: String,
    rating: Number,
    price: String,
    distance: Number,
  })],
}, { toObject: { versionKey: false } });

export interface IUser {
  name: string,
  email: string,
}

export interface IItinerary {
  user_id: ObjectId;
  name: string;
  start_date: Date;
  end_date: Date;
  destination: string;
  dest_coords: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  };
  collaborators: {
    user_id: string;
    name: string;
  }[];
  budget?: number;
  dining_budget?: number;
  restaurant_ratings?: number;
  max_walking_dist?: number;
  max_driving_dist?: number;
  current_cost?: number;
  comments?: string;
  tags: string[];
  activities: IActivity[];
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { toObject: { versionKey: false } });

export const itinerarySchema = new Schema<IItinerary>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  dest_coords: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  },
  budget: { type: Number, default: 500 },
  current_cost: { type: Number, default: 0 },
  dining_budget: { type: Number, default: 2 },
  restaurant_ratings: { type: Number, default: 3 },
  max_walking_dist: { type: Number, default: 5 },
  max_driving_dist: { type: Number, default: 15 },
  collaborators: [new Schema({
    user_id: Schema.Types.ObjectId,
    name: { type: String, required: true },
  })],
  comments: String,
  tags: [String],
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  activities: [activitySchema],
}, { toObject: { versionKey: false } });

export const User = model<IUser>('User', userSchema);
export const Yelp = model<IYelp>('Yelp', yelpSchema);
export const Itinerary = model<IItinerary>('Itinerary', itinerarySchema);
export const Activity = model<IActivity>('Activity', activitySchema);
