import React, { FC } from "react";
import * as sc from "./Suggestions.styles";
import { Grid } from "@material-ui/core";

interface Props {
  renderIcon: (icon: string) => JSX.Element;
  suggested?: {
    type?: string;
    destination?: string;
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
          return (
            <div key={index}>
              <Grid container item lg={8} md={8} sm={8} xs={8}>
                <sc.Destination>
                  {renderIcon(s.type || "HOTEL")}
                  {s.destination}
                </sc.Destination>
              </Grid>
              <Grid container item lg={4} md={4} sm={4} xs={4}>
                <sc.Comments>{s.comments}</sc.Comments>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Suggestions;
