import styled, {css} from "styled-components";
import * as c from "../../colors/colors"
const darkGrey = c.GREY;
export const Slot = styled.div`
    margin-top: 0.5em;
    padding-top: 0.75em;
    border-top: 2px solid ${c.WHITE};
    position: relative
`;

export const Time = styled.div`
    color:  ${c.WHITE};
    margin-bottom: 0.5em;
`;

export const Destination = styled.div`
    color: ${darkGrey};
    button {
        float: left;
        border: none;
        height: 2em;
        width: 2em;
        padding: 0;
        background-color: transparent;
        i {
            display: inline;
            padding-right: 0.5em;
            color: ${c.DARK_BLUE};
            font-size: 1.75em;
        }
    }
    button:hover {
        cursor: pointer;
    }
`;

export const Comments = styled.ul`
    margin-top: 0.25em;
    color:  rgba(71,71,71,0.8);
    padding-left: 1.5em;
    ${props => props.contentEditable && editStyles}
`;

const editStyles = css`
    border: 1.25px solid ${c.DARK_BLUE}; 
    border-radius: 7px;
    outline: none;
`;

export const Icon = styled.i`
    padding-right: 5px;
`;

export const EditButton = styled.button`
    margin: auto;
    border: none;
    height: 2em;
    width: 2em;
    padding: 0;
    background-color: transparent;
    margin-bottom: 0.5em;
    i {
        display: inline;
        padding-right: 0.5em;
        color: ${c.DARK_ORANGE};
        font-size: 1.75em;
    }
    :hover {
        cursor: pointer;
    }
`;

