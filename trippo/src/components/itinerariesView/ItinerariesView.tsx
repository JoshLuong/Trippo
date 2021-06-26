/// <reference path='./ItinerariesView.d.ts' />
import { FC, useState } from "react";
import * as sc from "./ItinerariesView.styles";
import ItineraryCard from "./ItineraryCard";
import Fade from "react-reveal/Fade";
import NewItineraryContainer from "components/newItineraryPage/NewItineraryContainer";
import Searchbar from "../searchBar/Searchbar"

interface Props {}

const data = [
  {
    tripName: "Hawaii 2022 Trip",
    description:
      "Our island-hopping Hawaii Trip planned for 2022; A 10 day adventure for the family",
    startDate: new Date(2022, 5, 20),
    endDate: new Date(2022, 5, 30),
    collaborators: ["John Doe", "Jane Doe", "other person"],
    labels: ["Luau", "Surfing", "Shopping"],
  },
  {
    tripName: "Alaska 2021 Trip",
    description: "Our 7 day Alaskan cruise from Vancouver",
    startDate: new Date(2021, 5, 20),
    endDate: new Date(2021, 5, 27),
    collaborators: ["John Doe", "Jane Doe", "1", "2"],
    labels: ["Cruise", "Sight-seeing"],
  },
];

const ItinerariesView: FC<Props> = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showNewItinerary, setShowNewItinerary] = useState(false);
  const handleRemove = () => {
    alert("removing");
  };

  const handleShowNewItinerary = (canShow: boolean) => {
    setShowNewItinerary(canShow);
  }
  return (
    <sc.ItinerariesViewGrid>
      <div
        style={{
          height: "7em",
          width: "100%",
          boxShadow: "0 4.5px 4px 0 rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
      <Searchbar />
      </div>
      <sc.ButtonDiv>
        <button onClick={() => setShowEdit(!showEdit)}>
          {!showEdit ? "Edit Itineraries" : "Done"}
        </button>
        <button onClick={() => setShowNewItinerary(true)}>Plan A New Trip</button>
      </sc.ButtonDiv>
      {
        showNewItinerary
          ? <NewItineraryContainer handleShowNewItinerary={handleShowNewItinerary}/>
          : null
      }
      <sc.Cards>
        <Fade duration={900} delay={500}>
          {data.map((card, index) => {
            return (
              <ItineraryCard
                card={card}
                key={index}
                showEdit={showEdit}
                handleRemove={handleRemove}
              />
            );
          })}
        </Fade>
      </sc.Cards>
    </sc.ItinerariesViewGrid>
  );
};

export default ItinerariesView;
