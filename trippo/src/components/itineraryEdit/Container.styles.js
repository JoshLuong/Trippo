import styled from "styled-components";
import * as c from "../../colors/colors";

export const fancytext = styled.div`
    text-align: center;
    font-style: italic;
`;

export const containerDiv = styled.div`
    position: absolute;
    width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    background-color: #a0c9e4;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 10px;
        }
    
        /* Track */
        ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
        }
    
        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: ${c.DARK_BLUE};
        border-radius: 20px;
        }
`;

export const calendarDiv = styled.div`
    height: 100%;
    overflow-y: none;

    @media (max-width: 668px) {
        margin-top: 10%;
    }
    @media (max-width: 400px) {
        margin-top: 15%;
    }
`;
