export enum ActivityType {
  ATTRACTION = "Attraction",
  HOTEL = "Hotel",
  AIRPORT = "Airport",
  RESTAURANT = "Restaurant",
  PARK = "Park",
  BEACH = "Beach",
  OTHER = "Other",
  SHOPPING = "Shopping",
}

export interface ActivityPopup {
  _id: string;
  location: {
    lat: number;
    lng: number;
  };
  time: string;
  destination?: string;
}

export interface Activity {
  itinerary_id?: string;
  _id: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  time: string;
  destination?: string;
  cost?: number;
  type?: ActivityType;
  comments: string[];
  business_ids?: string[];
  suggested?: {
    destination?: string;
    type?: string;
    url?: string;
    rating?: number;
    price?: string;
    distance?: number;
    comments?: string;
  }[];
}

export interface User {
  _id: string;
  name: string,
  email: string,
}
export interface Yelp {
  name: string;
  business_id: string;
  url: string;
  rating: number;
  price?: string;
  distance: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  comments: string;
}


export interface Itinerary {
  _id: string;
  user_id: any;
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
  max_traveling_dist: number;
  collaborators: {
    user_id: string;
    name: string;
    email: string;
  }[];
  budget?: number | null;
  current_cost?: number;
  comments?: string;
  tags: string[];
  activities: Activity[];
}
