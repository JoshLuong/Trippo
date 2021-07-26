import styled from "styled-components";
import * as c from "../../colors/colors";

export const Time = styled.div`
  color: #f5f3f3;
`;

export const Destination = styled.div`
  padding-top: 5px;
  overflow: hidden;
  color: rgba(71, 71, 71, 0.65);
  @media (max-width: 960px) {
    margin-left: 1em;
  }
  i {
    margin-right: 5px;
    color: ${c.YELLOW};
  }
`;

export const SuggestionTitle = styled.div`
  color: ${c.GREY};
  border-right: 1.5px solid ${c.DARK_GREY};
  @media (max-width: 960px) {
    border-right: 0px;
  }
  padding-bottom: 3px;
  width: 7.5em;
  padding-left: 4px;
`;

export const Comments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: rgba(71, 71, 71, 0.55);
  padding-top: 5px;
  font-size: 0.85em;
  padding-left: 1.5em;
  padding-right: 1em;
  text-align: right;

  img {
    margin-left: 8px;
  }
`;


export const Distance = styled.div`
  width: 100%;
  color: rgba(71, 71, 71, 0.55);
  font-size: 0.85em;
  @media (max-width: 960px) {
    margin-left: 1em;
  }
`;

export const Icon = styled.i`
  padding-right: 5px;
`;
