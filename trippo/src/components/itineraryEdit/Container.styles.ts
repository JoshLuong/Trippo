import styled from "styled-components";
import {
  DateRangeFocus,
  DateRangePickerCalendar,
  Modifiers,
} from "react-nice-dates";

export const StyledDatePicker = styled(DateRangePickerCalendar)`
  display: flex;
  width: 100%;
`;


export const fancytext = styled.div`
  text-align: center;
  font-style: italic;
`;

export const containerDiv = styled.div`
  border-radius: 0 10px 10px 0;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  overflow-x: hidden;
`;

export const calendarDiv = styled.div`
  height: 100%;
  overflow-y: none;
  @media (max-width: 400px) {
    margin-top: 25px;
    height: calc(100% - 25px);
  }
`;

export const Calendar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  > div {
    width: 100%;
    height: 100%;
  }
`;
