export interface Activity {
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
  user_id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  collaborators: {
    user_id: string;
    name: string;
  }[];
  budget?: number;
  current_cost?: number;
  comments?: string;
  tags: string[];
  activities: Activity[];
}
