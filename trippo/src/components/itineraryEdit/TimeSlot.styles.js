import styled, {css} from "styled-components";
import * as c from "../../colors/colors"
const darkGrey = c.GREY;
export const Slot = styled.div`
    margin-top: 0.5em;
    border-radius: 5px;
    padding-top: 0.75em;
    padding-left: 0.25em;
    padding-right: 0.25em;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.45);
    z-index:1;
    position: relative;
    &:hover {
        transform: scale(1.025);
      }
`;

export const Time = styled.div`
    color:  ${c.GREY};
    border-right: 2px solid ${c.YELLOW};
    padding-right: 2em;
    margin-bottom: 0.5em;
    margin-left: 4px;
`;

export const Destination = styled.div`
    color: ${darkGrey};
    i {
        @media (max-width: 960px) {
            padding-left: 10px;
        }
        color: ${c.DARK_BLUE};
    }

    button {
        border: none;
        height: 2em;
        width: 2em;
        padding: 0;
        background-color: transparent;
        i {
            display: inline;
            color: ${c.DARK_BLUE};
            font-size: 1.75em;
        }
    }
    button:hover {
        cursor: pointer;
    }
`;
export const CommentButton = styled.div`
    color: ${darkGrey};
    button {
        border: none;
        height: 2em;
        width: 2em;
        padding: 0;
        background-color: transparent;
        i {
            display: inline;
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
    margin-right: 1.5em;
    color:  rgba(71,71,71,0.8);
    padding-left: 1em;
    ${props => props.contentEditable && editStyles}
    @media (max-width: 960px) {
        margin-left: 1em;
    }
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

