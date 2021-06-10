import React, { useState } from "react";
import * as sc from "./Suggestions.styles";
import { Grid } from "@material-ui/core";

function Suggestions({ renderIcon, suggested }) {
  return (
    <Grid container lg={12}>
      <Grid container item lg={3} md={3} sm={12} xs={12}>
        <sc.SuggestionTitle>Suggestions</sc.SuggestionTitle>
      </Grid>
      <Grid container item lg={9} md={9} sm={12} xs={12}>
        {suggested.map((s) => {
          return (
            <>
              <Grid contatiner item lg={8} md={8} sm={8} xs={8}>
                <sc.Destination>
                  {renderIcon(s.type)}
                  {s.destination}
                </sc.Destination>
              </Grid>
              <Grid contatiner item lg={4} md={4} sm={4} xs={4}>
                <sc.Comments>{s.comments}</sc.Comments>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Suggestions;
