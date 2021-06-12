import { Grid } from "@material-ui/core";
import styled from "styled-components";
import * as c from "../../colors/colors"



export const loginDiv = styled.div`
    text-align: center;
    position: relative;
    border-radius: 10px;
    background-color: white;
    border-top: 10px solid ${c.DARK_BLUE};
    width: 100%;
    height: 50%;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;