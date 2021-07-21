export interface Activity {
  _id: string;
  location: {
    lat: number;
    lng: number;
  };
  time?: Date;
  destination?: string;
  cost?: number;
  type?: string;
  comments: string[];
  suggested?: {
    destination?: string;
    type?: string;
    comments?: string;
  }[];
}

export interface User {
  name: string,
  email: string,
  password: string,
}

export interface Itinerary {
  _id: string;
  user_id: any; // should we use mongoose ObjectID type?
  name: string;
  start_date: Date;
  end_date: Date;
  destination: string;
  dest_coords: {
    lat: number;
    lng: number;
  };
  dining_budget?: number;
  restaurant_ratings?: number;
  max_walking_dist?: number;
  max_driving_dist?: number;
  collaborators: {
    user_id: string;
    name: string;
  }[];
  budget?: number;
  comments?: string;
  tags: string[];
  activities: Activity[];
}
