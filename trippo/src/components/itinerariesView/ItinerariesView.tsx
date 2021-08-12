/// <reference path='./ItinerariesView.d.ts' />
import React, { useState, useEffect } from "react";
import * as sc from "./ItinerariesView.styles";
import ItineraryCard from "./ItineraryCard";
import { debounce } from "lodash";
import NewItineraryContainer from "components/itineraryForm/NewItineraryContainer";
import Searchbar from "../searchBar/Searchbar";
import {
  useCreateItineraryMutation,
  useDeleteItineraryMutation,
  useLazyGetItinerariesQuery,
  useUpdateItineraryMutation,
} from "services/itinerary";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import { useCallback } from "react";

const ItinerariesView = () => {
  const [createItinerary,{ isLoading: isCreating }] = useCreateItineraryMutation();
  const [updateItinerary, { isLoading: isUpdating }] = useUpdateItineraryMutation();
  const [deleteItinerary, { isLoading: isDeleting }] = useDeleteItineraryMutation();
  const [triggerGetQuery, result] = useLazyGetItinerariesQuery();

  const [filterText, setFilterText] = useState("");
  const [showNewItinerary, setShowNewItinerary] = useState(false);
  const [successSnackbar, setSuccess] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const handlePageChange = useCallback(
    (_event: any, page: number) => {
      history.push({
        search: `?page=${page}`,
      });
    },
    [history]
  );

  useEffect(() => {
    triggerGetQuery({
      offset: 5 * (Number(page || 1) - 1),
      limit: 5,
      name: filterText,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, isUpdating, isCreating, isDeleting, page]);

  useEffect(() => {
     // on filter change, if page > 1, destroy pagination
    if (Number(page || 1) !== 1 && filterText !== "") {
      handlePageChange(null, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText]);

  const search = debounce((e: any) => {
    setFilterText(e.target.value);
  }, 400);

  const handleShowNewItinerary = (canShow: boolean) => {
    setShowNewItinerary(canShow);
  };

  const handleSuccessClose = (event: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  const handleErrorClose = (event: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
  };

  return (
    <sc.ItinerariesViewGrid>
      <Snackbar
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Success
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={() => setErrorSnackbar(false)} severity="error">
          Unable to process request, please check that you have proper user
          priveleges.
        </Alert>
      </Snackbar>
      <sc.SearchDiv>
        <sc.StyledSearchbar>
          <Searchbar onChange={search} />
        </sc.StyledSearchbar>
        <sc.ButtonDiv>
          <sc.AddButton size="small" onClick={() => setShowNewItinerary(true)}>
            <sc.StyledAddIcon />
            <span>Plan A New Trip</span>
          </sc.AddButton>
        </sc.ButtonDiv>
      </sc.SearchDiv>
      <sc.PaginationDiv>
        <Pagination
          count={result.data?.count ? Math.ceil(result.data.count / 5) : 1}
          page={Number(page) || 1}
          onChange={handlePageChange}
        />
      </sc.PaginationDiv>
      {showNewItinerary ? (
        <NewItineraryContainer
          handleShowNewItinerary={handleShowNewItinerary}
          createItinerary={createItinerary}
          setSuccess={setSuccess}
        />
      ) : null}
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
                    .then((res: any) => {
                      if (res.error) {
                        setErrorSnackbar(true);
                      } else {
                        setSuccess(true);
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              />
            );
          })}
        </sc.Cards>
      )}
      <sc.Landscape>
        <sc.Background src="/manarola.jpg" />
      </sc.Landscape>
    </sc.ItinerariesViewGrid>
  );
};

export default ItinerariesView;
