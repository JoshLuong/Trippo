import styled from "styled-components";
import * as c from "../../colors/colors";

export const Time = styled.div`
  color: #f5f3f3;
`;

export const Destination = styled.div`
  padding-top: 5px;
  color: rgba(71, 71, 71, 0.65);
  @media (max-width: 960px) {
    margin-left: 1em;
  }
  i {
    margin-right: 5px;
    color: ${c.YELLOW};
    text-shadow: 2px 1px #86868694;
  }
`;

export const SuggestionTitle = styled.div`
  color: ${c.GREY};
  border-right: 2px solid ${c.DARK_GREY};
  padding-right: 0.705em;
  margin-bottom: 0.5em;
  padding-left: 4px;
`;

export const Comments = styled.div`
  width: 100%;
  color: rgba(71, 71, 71, 0.55);
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
