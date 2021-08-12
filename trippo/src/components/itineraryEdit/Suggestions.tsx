import { FC, useEffect, useState } from "react";
import * as sc from "./Suggestions.styles";
import { Activity, ActivityType, Yelp } from "types/models";
import { useAppSelector } from "app/store";
import { Grid } from "@material-ui/core";
import { getDistanceFromLatLonInKm } from "./utils";

interface Props {
  renderIcon: (icon: ActivityType) => JSX.Element;
  activity: Activity;
  hidden?: boolean;
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

const Suggestions: FC<Props> = ({ activity, hidden = false }) => {
  const itinerary = useAppSelector((state) => state.itinerary.value);
  const [suggested, setSuggested] = useState<Yelp[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/yelp/businesses`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        itineraryId: itinerary?._id,
        activityId: activity._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((suggested) => {
        if (isMounted) {
          setSuggested(suggested);
        }
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <sc.ContainerGrid $isHidden={hidden} container item lg={12}>
      <Grid container item lg={3} md={3} sm={12} xs={12}>
        <sc.SuggestionTitle>Suggestions</sc.SuggestionTitle>
      </Grid>
      <Grid container item lg={9} md={9} sm={12} xs={12}>
        {suggested?.map((s: Yelp, index) => {
          const starString =
            Math.ceil(s.rating || 0) === s.rating
              ? `/yelp/regular_${s.rating}.png`
              : `/yelp/regular_${Math.floor(s.rating || 0)}_half.png`;
          return (
            <Grid container item lg={12} key={index}>
              <Grid container item lg={8} md={8} sm={8} xs={8}>
                <sc.Destination>{s.name}</sc.Destination>
                <sc.Distance>
                  {getDistanceFromLatLonInKm(
                    s.coordinates.latitude,
                    s.coordinates.longitude,
                    activity.location.lat,
                    activity.location.lng
                  )}{" "}
                  kms away
                </sc.Distance>
              </Grid>
              <Grid container item lg={4} md={4} sm={4} xs={4}>
                <sc.YelpStarsAndCost>
                  <span>{s.price}</span>
                  <img alt={`${s.rating} stars`} src={starString} width="70" />
                </sc.YelpStarsAndCost>
                <sc.Comments>
                  <a target="blank" rel="noreferrer" href={s.url}>
                    <img
                      src="/yelp/yelp_logo.png"
                      alt="Yelp logo"
                      width="40"
                    ></img>
                  </a>
                </sc.Comments>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </sc.ContainerGrid>
  );
};

export default Suggestions;
