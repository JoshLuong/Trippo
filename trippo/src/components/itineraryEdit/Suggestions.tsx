import React, { FC } from "react";
import * as sc from "./Suggestions.styles";
import { Grid } from "@material-ui/core";

interface Props {
  renderIcon: (icon: string) => JSX.Element;
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

const Suggestions: FC<Props> = ({ renderIcon, suggested }) => {
  return (
    <Grid container item lg={12}>
      <Grid container item lg={3} md={3} sm={12} xs={12}>
        <sc.SuggestionTitle>Suggestions</sc.SuggestionTitle>
      </Grid>
      <Grid container item lg={9} md={9} sm={12} xs={12}>
        {suggested?.map((s, index) => {
          const starString = Math.ceil(s.rating || 0) === s.rating ? `/yelp/regular_${s.rating}.png` : `/yelp/regular_${Math.floor(s.rating || 0)}_half.png`;
          return (
            <Grid container item lg={12} key={index}>
              <Grid container item lg={8} md={8} sm={8} xs={8}>
                <sc.Destination>
                  {renderIcon(s.type || "HOTEL")}
                  {s.destination}
                </sc.Destination>
                <sc.Distance>
                  {Math.round(((s.distance || 0) / 1000) * 10)/ 10} kms away
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
