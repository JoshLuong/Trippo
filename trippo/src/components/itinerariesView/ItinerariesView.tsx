/// <reference path='./ItinerariesView.d.ts' />
import React, { useState, useEffect } from "react";
import * as sc from "./ItinerariesView.styles";
import ItineraryCard from "./ItineraryCard";
import Fade from "react-reveal/Fade";
import NewItineraryContainer from "components/newItineraryPage/NewItineraryContainer";
import Searchbar from "../searchBar/Searchbar"
import { useCreateItineraryMutation, useDeleteItineraryMutation, useLazyGetItinerariesQuery } from 'services/itinerary';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';


// const server = "http://localhost:4000/api/itineraries/";
const ItinerariesView = () => {
  const [
    createItinerary, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useCreateItineraryMutation()
  const [triggerGetQuery, result] = useLazyGetItinerariesQuery();
  const [deleteItinerary, { isLoading: isDeleting }] = useDeleteItineraryMutation();

  const history = useHistory();
  const location = useLocation();
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    triggerGetQuery({
      offset: 5 * (Number(page || 1) - 1),
      limit: 5,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating, page]);

  const [showEdit, setShowEdit] = useState(false);
  const [showNewItinerary, setShowNewItinerary] = useState(false);


  const handleShowNewItinerary = (canShow: boolean) => {
    setShowNewItinerary(canShow);
  }

  const handlePageChange = (_event: any, page: number) => {
    history.push({
      search: `?page=${page}`
    });
  }

  // TODO: take out inline style; move to search 
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
      <sc.PaginationDiv>
        <Pagination count={result.data?.count ? Math.ceil(result.data.count / 5) : 1} page={Number(page) || 1} onChange={handlePageChange} />
      </sc.PaginationDiv>
      {
        showNewItinerary
          ? <NewItineraryContainer handleShowNewItinerary={handleShowNewItinerary} createItinerary={createItinerary} />
          : null
      }
      {result.data?.itineraries.length && (
        <sc.Cards>
          {result.data.itineraries.map((card, index) => {
            return (
              <Fade duration={900} delay={500}>
                <ItineraryCard
                  card={card}
                  key={index}
                  showEdit={showEdit}
                  handleRemove={async () => {
                    deleteItinerary(card._id)
                      .then(() => {
                        // delete should chain get request - right now manual reload required to see changes
                      })
                      .catch((e) => { console.log(e) })
                  }}
                />
              </Fade>
            );
          })}
        </sc.Cards>
      )}
    </sc.ItinerariesViewGrid>
  );
};

export default ItinerariesView;
