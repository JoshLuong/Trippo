import React, { FC, useState } from "react";
import * as sc from "./exampleComp2.styles";

interface Props {
  handleClick: () => void;
}

const ExampleComp2: FC<Props> = ({ children, handleClick }) => {
  return <sc.fancytext onClick={handleClick}>{children}</sc.fancytext>;
};

export default ExampleComp2;
