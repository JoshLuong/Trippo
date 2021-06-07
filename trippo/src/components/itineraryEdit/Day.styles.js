import styled from "styled-components";
import * as c from "../../colors/colors"

export const dayDiv = styled.div`
    padding: 1em;
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
`;

export const EditButton = styled.button`
    margin: auto;
    margin-top: 1em;
    border: none;
    height: 2em;
    width: 5em;
    background-color: ${c.DARK_BLUE};
    color: ${c.WHITE};
    letter-spacing: 1px;
    font-weight: 545;
    padding: 0;
    border-radius: 16px;
    margin-bottom: 0.5em;
    :hover {
        cursor: pointer;
    }
`;

export const Spacer = styled.div`
    display: inline-block;
    width: 2em;
`;


export const dayDate = styled.div`
    padding-bottom: 0.5em;
    position: relative;
    display: flex;
    color: ${c.WHITE};
    font-weight: 550;
    letter-spacing: 2px;
    button {
        border: none;
        height: 2em;
        padding: 0;
        padding-left: 0.25em;
        background-color: transparent;
        z-index:1;
        i {
            display: inline;
            padding-right: 0.25em;
            color: ${c.DARK_BLUE};
            font-size: 1.5em;
        }
    }
    button:hover {
        cursor: pointer;
    }
    div {
        margin: auto;
        text-align: center;
    }
`;

export const daysWeek = styled.div`
display: inline-block;
padding: 0.5em 0.7em;
background-color: ${c.YELLOW};
`;
