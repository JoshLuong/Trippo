import styled from "styled-components";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { YELLOW } from "../../colors/colors";
import { ActivityType } from 'types/models';

export function renderIcon(t: ActivityType | undefined) {
  switch (t) {
    case ActivityType.RESTAURANT:
      return <Icon color="#073B4C" className="fas fa-utensils"></Icon>;
    case ActivityType.AIRPORT:
      return <Icon color="#277DA1" className="fas fa-plane"></Icon>;
    case ActivityType.HOTEL:
      return <Icon color="#2ec4b6" className="fas fa-hotel"></Icon>;
    case ActivityType.PARK:
      return <Icon color="#6dbe73" className="fas fa-tree"></Icon>;
    case ActivityType.BEACH:
      return <StyledBeachIcon fontSize="small" />;
    case ActivityType.SHOPPING:
      return <ShoppingIcon color="#ffd500" className="fas fa-shopping-cart"></ShoppingIcon>;
    case ActivityType.ATTRACTION:
      return <Icon color="#ef476f" className="fas fa-camera"></Icon>;
    default:
      return <Icon color={YELLOW} className="fas fa-map-marker-alt"></Icon>;
  }
}

export function getIconColor(t: ActivityType | undefined, opacity: string): string {
  switch (t) {
    case ActivityType.RESTAURANT:
      return `rgba(7,59,76,${opacity})`;
    case ActivityType.AIRPORT:
      return `rgba(39,125,161,${opacity})`;
    case ActivityType.HOTEL:
      return `rgba(46,196,182,${opacity})`;
    case ActivityType.PARK:
      return `rgba(109,190,115,${opacity})`;
    case ActivityType.BEACH:
      return `rgba(0,187,249,${opacity})`;
    case ActivityType.SHOPPING:
      return `rgba(255,213,0,${opacity})`;
    case ActivityType.ATTRACTION:
      return `rgba(239,71,111,${opacity})`;
    default:
      return `rgba(255,183,3,${opacity})`;
  }
}

export function getIconHexColor(t: string | undefined) {
  switch (t) {
    case ActivityType.RESTAURANT:
      return "#073B4C";
    case ActivityType.AIRPORT:
      return "#277DA1";
    case ActivityType.HOTEL:
      return "#2ec4b6";
    case ActivityType.PARK:
      return "#6dbe73";
    case ActivityType.BEACH:
      return "#00bbf9";
    case ActivityType.SHOPPING:
      return "#ffd500";
    case ActivityType.ATTRACTION:
      return "#ef476f";
    default:
      return YELLOW;
  }
}

export const hexColorList = [
  "#073B4C",
  "#277DA1",
  "#2ec4b6",
  "#6dbe73",
  "#00bbf9",
  "#ffd500",
  "#ef476f",
  YELLOW
];

const Icon = styled.i`
  color: ${(props) => props.color};
  padding-right: 5px;
  margin-left: 3px;
`;

const ShoppingIcon = styled.i`
  color: ${(props) => props.color};
  padding-right: 5px;
`;

const StyledBeachIcon = styled(BeachAccessIcon)`
  padding-right: 5px;
  color: #00bbf9;
`;
