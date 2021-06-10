import React, { useState } from "react";
import * as sc from "./exampleComp2.styles";

function ExampleComp2({ children, handleClick }) {
  return (
    <sc.fancytext
      onClick={() => {
        handleClick;
      }}
    >
      {children}
    </sc.fancytext>
  );
}

export default ExampleComp2;
