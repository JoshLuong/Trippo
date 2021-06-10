import React, { useState } from "react";
import ExampleComp2 from "./exampleComp2";
import * as sc from "./ExampleComp1.styles";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../app/reducers/exampleComp1sSlice";

function ExampleComp1({ desc, index }) {
  // destructure the props!
  const dispatch = useDispatch();
  const [description, setDesc] = useState(desc);
  // this is the state as defined in the slice
  const state = useSelector((state) => state.exampleState.value);

  return (
    <li>
      <sc.div>
        {description}
        <ExampleComp2
          handleClick={() =>
            dispatch(
              add(
                JSON.stringify({
                  url,
                  desc,
                })
              )
            )
          }
        >
          Delete Example
        </ExampleComp2>
      </sc.div>
    </li>
  );
}

export default ExampleComp1;
