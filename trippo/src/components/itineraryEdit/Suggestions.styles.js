import styled from "styled-components";
import * as c from "../../colors/colors"

const darkGrey = c.GREY;

export const Time = styled.div`
    color: #F5F3F3;
`;

export const Destination = styled.div`
    padding-top: 5px;
    color: ${darkGrey};
`;

export const SuggestionTitle = styled.div`
    color: ${c.WHITE};
    padding-bottom: 0.5em;
`;

export const Comments = styled.div`
    color:  rgba(71,71,71,0.8);
    padding-top: 5px;
    font-size: 0.85em;
    padding-left: 1.5em;
    text-align: right;
`;

export const Icon = styled.i`
    padding-right: 5px;
`;
