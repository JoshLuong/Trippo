import styled from "styled-components";
import * as c from "../../colors/colors";

export const fancytext = styled.div`
    text-align: center;
    font-style: italic;
`;

export const containerDiv = styled.div`
    width: 40%;
    box-sizing: border-box;
    position: relative;
    background-color: #a0c9e4;
`;

export const dayDiv = styled.div`
    height: 100%;
`;

export const SideBar = styled.div`
    min-height: 100%;
    background-color: ${c.DARK_BLUE};
    button {
        border: none;
        height: 100%;
        padding: 0;
        padding-left: 0.65em;
        background-color: transparent;
        i {
            display: inline;
            color: ${c.WHITE};
            font-size: 1.75em;
        }
    }
    button:hover {
        cursor: pointer;
    }
`;

export const Container = styled.div`
    display: inline-block;
    background-color: ${c.WHITE};
    height: 65vh;
    flex: 0 0 585px;
    position: relative;

    @media (max-width: 668px) {
        flex: 0 0 80%;
    }
`;