/// <reference path='./ItinerariesView.d.ts' />
import React, { useState, useEffect } from "react";
import * as sc from "./ItinerariesView.styles";
import ItineraryCard from "./ItineraryCard";
import _ from "lodash";
import NewItineraryContainer from "components/newItineraryPage/NewItineraryContainer";
import Searchbar from "../searchBar/Searchbar"
import { useCreateItineraryMutation, useDeleteItineraryMutation, useLazyGetItinerariesQuery, useUpdateItineraryMutation } from 'services/itinerary';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { useCallback } from "react";


const ItinerariesView = () => {
  const [
    createItinerary, // This is the mutation trigger
    { isLoading: isCreating }, // This is the destructured mutation result
  ] = useCreateItineraryMutation()

  const [updateItinerary, { isLoading: isUpdating }] = useUpdateItineraryMutation();
  const [deleteItinerary, { isLoading: isDeleting }] = useDeleteItineraryMutation();
  const [triggerGetQuery, result] = useLazyGetItinerariesQuery();
  const [filterText, setFilterText] = useState("");

  const history = useHistory();
  const location = useLocation();
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const search = _.debounce((e: any) => {
    setFilterText(e.target.value)
  }, 400);

  const [showNewItinerary, setShowNewItinerary] = useState(false);

  const [successSnackbar, setSuccess] = useState(false);

  const handlePageChange = useCallback((_event: any, page: number) => {
    history.push({
      search: `?page=${page}`
    });
  }, [history]);

  useEffect(() => {
    triggerGetQuery({
      offset: 5 * (Number(page || 1) - 1),
      limit: 5,
      name: filterText,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, isUpdating, isCreating, isDeleting, page]);

  useEffect(() => {
    if (Number(page || 1) !== 1 && filterText !== "") { // on filter change, if page > 1, destroy pagination
      handlePageChange(null, 1);
    }
  }, [filterText, page, handlePageChange]);


  const handleShowNewItinerary = (canShow: boolean) => {
    setShowNewItinerary(canShow);
  }

  const handleClose = (event: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  }

  // TODO: take out inline style; move to search 
  return (
    <sc.ItinerariesViewGrid>
      <Snackbar open={successSnackbar} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Success
        </Alert>
      </Snackbar>
      <div
        style={{
          height: "7em",
          width: "100%",
          boxShadow: "0 4.5px 4px 0 rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
        <Searchbar onChange={search} />
      </div>
      <sc.ButtonDiv>
        <button onClick={() => setShowNewItinerary(true)}>Plan A New Trip</button>
      </sc.ButtonDiv>
      <sc.PaginationDiv>
        <Pagination count={result.data?.count ? Math.ceil(result.data.count / 5) : 1} page={Number(page) || 1} onChange={handlePageChange} />
      </sc.PaginationDiv>
      {
        showNewItinerary
          ? <NewItineraryContainer handleShowNewItinerary={handleShowNewItinerary} createItinerary={createItinerary} setSuccess={setSuccess} />
          : null
      }
      {result.data?.itineraries.length && (
        <sc.Cards>
          {result.data.itineraries.map((card, index) => {
            return (
              <ItineraryCard
                card={card}
                key={index}
                setSuccess={setSuccess}
                updateItinerary={updateItinerary}
                handleRemove={async () => {
                  deleteItinerary(card._id)
                    .then(() => {
                      setSuccess(true);
                    })
                    .catch((e) => { console.log(e) })
                }}
              />
            );
          })}
        </sc.Cards>
      )}
    </sc.ItinerariesViewGrid>
  );
};

export default ItinerariesView;
