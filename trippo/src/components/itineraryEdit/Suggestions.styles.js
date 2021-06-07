import styled from "styled-components";
import * as c from "../../colors/colors"

const darkGrey = c.GREY;

export const Time = styled.div`
    color: #F5F3F3;
`;

export const Destination = styled.div`
    padding-top: 5px;
    color: rgba(71,71,71,0.65);
    @media (max-width: 960px) {
        margin-left: 1em;
    }
`;

export const SuggestionTitle = styled.div`
    color: ${c.GREY};
    border-right: 2px solid ${c.YELLOW};
    padding-right: 1.105em;
    margin-bottom: 0.5em;
    padding-left: 4px;
`;

export const Comments = styled.div`
    color:  rgba(71,71,71,0.55);
    padding-top: 5px;
    font-size: 0.85em;
    padding-left: 1.5em;
    padding-right: 1em;
    padding-bottom: 1em;
    text-align: right;
`;

export const Icon = styled.i`
    padding-right: 5px;
`;
