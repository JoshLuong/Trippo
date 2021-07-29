import { FC, useEffect, useState } from "react";
import * as sc from "./Suggestions.styles";
import { Activity, Yelp } from 'types/models';
import { useAppSelector } from 'app/store';
import { Grid } from "@material-ui/core";

interface Props {
  renderIcon: (icon: string) => JSX.Element;
  activity: Activity;
  suggested?: {
    destination?: string;
    type?: string;
    url?: string;
    rating?: number;
    price?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    distance?: number;
    comments?: string;
  }[];
}

const Suggestions: FC<Props> = ({ activity }) => {
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [suggested, setSuggested] = useState<Yelp[]>([]);

  // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }

  useEffect(() => {
    fetch(`/api/yelp/businesses`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        itineraryId: itinerary?._id,
        activityId: activity._id,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(suggested => {
      setSuggested(suggested);
    });
  })
  return (
    <Grid container item lg={12}>
      <Grid container item lg={3} md={3} sm={12} xs={12}>
        <sc.SuggestionTitle>Suggestions</sc.SuggestionTitle>
      </Grid>
      <Grid container item lg={9} md={9} sm={12} xs={12}>
        {suggested?.map((s: Yelp, index) => {
          const starString = Math.ceil(s.rating || 0) === s.rating ? `/yelp/regular_${s.rating}.png` : `/yelp/regular_${Math.floor(s.rating || 0)}_half.png`;
          return (
            <Grid container item lg={12} key={index}>
              <Grid container item lg={8} md={8} sm={8} xs={8}>
                <sc.Destination>
                  {s.name}
                </sc.Destination>
                <sc.Distance>
                  {Math.round((getDistanceFromLatLonInKm(s.coordinates.latitude, s.coordinates.longitude, activity.location.lat, activity.location.lng)) * 10)/ 10} kms away
                </sc.Distance>
              </Grid>
              <Grid container item lg={4} md={4} sm={4} xs={4}>
                <sc.Comments>
                  {s.price}
                  <img alt={`${s.rating} stars`} src={starString} width="70"/>
                </sc.Comments>
                <sc.Comments>
                  <a target="_blank" href={s.url}>
                    <img src='/yelp/yelp_logo.png' width="40"></img>
                  </a>
                </sc.Comments>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Suggestions;
