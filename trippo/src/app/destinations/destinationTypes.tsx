import styled from "styled-components";
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import * as c from "../../colors/colors"
const Icon = styled.i`
  color: ${props => props.color};
  padding-right: 5px;
`;
const StyledBeachIcon = styled(BeachAccessIcon)`
  padding-right: 5px;
  color: #00bbf9;
`;
export const ATTRACTION = "Attraction"
export const HOTEL = "Hotel";
export const AIRPORT = "Airport";
export const RESTAURANT = "Restaurant";
export const PARK = "Park";
export const BEACH = "Beach";
export const OTHER = "Other";
export const SHOPPING = "Shopping";

export enum DestinationType {
  ATTRACTION = "Attraction",
  HOTEL = "Hotel",
  AIRPORT = "Airport",
  RESTAURANT = "Restaurant",
  PARK = "Park",
  BEACH = "Beach",
  OTHER = "Other",
  SHOPPING = "Shopping",
}

export function renderIcon(t: string | undefined) {
  switch (t) {
    case RESTAURANT:
      return <Icon color="#073B4C" className="fas fa-utensils"></Icon>
    case AIRPORT:
      return <Icon color="#277DA1" className="fas fa-plane"></Icon>;
    case HOTEL:
      return <Icon color="#2ec4b6" className="fas fa-hotel"></Icon>;
    case PARK:
      return <Icon color="#6dbe73" className="fas fa-tree"></Icon>
    case BEACH:
      return <StyledBeachIcon fontSize="small"/>
    case SHOPPING: 
      return <Icon color="#ffd500" className="fas fa-shopping-cart"></Icon>
    case ATTRACTION:
      return <Icon color="#ef476f" className="fas fa-camera"></Icon>
    default:
      return <Icon color={c.YELLOW} className="fas fa-map-marker-alt"></Icon>;
    // code block
  }
};

export function getIconColor(t: string | undefined, opacity: string): string {
  switch (t) {
    case RESTAURANT:
      return `rgba(7,59,76,${opacity})`;
    case AIRPORT:
      return `rgba(39,125,161,${opacity})`;
    case HOTEL:
      return `rgba(46,196,182,${opacity})`;
    case PARK:
      return `rgba(109,190,115,${opacity})`;
    case BEACH:
      return `rgba(0,187,249,${opacity})`;
    case SHOPPING: 
      return `rgba(255,213,0,${opacity})`;
    case ATTRACTION:
      return `rgba(239,71,111,${opacity})`;
    default:
      return `rgba(255,183,3,${opacity})`;
    // code block
  }
};
