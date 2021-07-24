import React, { useRef, useState } from "react";
import "./loading.css";
import Container from "../itineraryEdit/Container";
import * as sc from "./ExpensePage.styles";
import Map from "../map/Map";
import "../map/Map.css";
import { GeocoderContainer } from 'components/map/Map.styles';
import Searchbar from "components/searchBar/Searchbar";
import ReceiptIcon from '@material-ui/icons/Receipt';
import NewSlot from "components/itineraryEdit/NewSlot";

function ExpensePage() {

  return (
    <sc.Container>
        <sc.Title>Expenses for the current itinerary</sc.Title>

    </sc.Container>
  );
}

export default ExpensePage;
