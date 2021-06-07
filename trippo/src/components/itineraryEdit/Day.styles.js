import styled from "styled-components";
import * as c from "../../colors/colors"

export const dayDiv = styled.div`
    margin: 1em;
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
            font-size: 1.75em;
        }
    }
    button:hover {
        cursor: pointer;
    }
    div {
        margin: auto;
        align-items: center;
        transform: skew(-45deg);
        div {
            padding-left: 2em;
            padding-right: 2em;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
            transform: skew(45deg);
            clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
            background-color: ${c.YELLOW}
        }
    }
`;
