import React, { useEffect, useRef, useState } from "react";
import "./loading.css";
import Container from "../itineraryEdit/Container";
import * as sc from "./ItineraryPage.styles";
import Map from "../map/Map";
import "../map/Map.css";
import { GeocoderContainer } from 'components/map/Map.styles';
import Searchbar from "components/searchBar/Searchbar";
import ReceiptIcon from '@material-ui/icons/Receipt';
import NewSlot from "components/itineraryEdit/NewSlot";
import ExpensePage from "./ExpensePage";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useAppDispatch } from 'app/store';
import { useParams } from 'react-router-dom';
import { useGetItineraryByIdQuery, useUpdateItineraryMutation } from 'services/itinerary';
import { setItinerary } from 'app/reducers/itinerarySlice';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Itinerary } from 'types/models';

export type ContextInterface = {
  setUnsavedChanges: (value: any) => void;
  unsavedChanges: boolean;
  setShowUnsavedChangesModal: (value: any) => void;
  updateItinerary: (value: Itinerary) => void;
} | null

export const ItineraryContext = React.createContext<ContextInterface>(null);

function ItineraryPage() {
  const [showItinerary, setShowItinerary] = useState(true);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showEditFeedback, setShowEditFeedback] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  // populate with the handler the user wants to execute
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState<any>(null);
  const geocoderContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canOpenNewSlot, setCanOpenNewSlot] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: itinerary } = useGetItineraryByIdQuery(id);
  const [updateItinerary, { isLoading: isUpdating, data: updatedItinerary }] = useUpdateItineraryMutation();

  useEffect(() => {
    if (updatedItinerary) {
      console.log(updatedItinerary);
      dispatch(setItinerary(updatedItinerary));
      setShowEditFeedback(true);
    } else if (!isUpdating) {
      dispatch(setItinerary(itinerary));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary, updatedItinerary, isUpdating]);

  // tip: to use showUnsavedChangesModal, pass in handler function the user wants to execute when there are unsaved changes,
  // but the function should not handle any unsavedChanges state, as it will reference the old state from when the function
  // was called (here we employ a bypass by calling handleOpenItineraryNoChanges)
  function handleOpenItinerary() {
    if (unsavedChanges) {
      setShowUnsavedChangesModal(() => handleOpenItineraryNoChanges);
      return;
    }
    handleOpenItineraryNoChanges()
  }

  function handleOpenItineraryNoChanges() {
    setShowItinerary(!showItinerary);
    setShowExpenses(false);
  }

  function handleClose() {
    setShowUnsavedChangesModal(null);
  };

  function handleShowExpenses() {
    if (unsavedChanges) {
      setShowUnsavedChangesModal(() => handleShowExpensesNoChanges);
      return;
    }
    handleShowExpensesNoChanges();
  }

  function handleShowExpensesNoChanges() {
    setShowExpenses(!showExpenses);
    setShowItinerary(false);
  }

  function handleIsLoading() {
    setIsLoading(!isLoading);
  }

  function handleNewSlotClick(name: string) { // TODO addd more to here
    setCanOpenNewSlot(true);
  }

  function handleNewSlotClose() { 
    setCanOpenNewSlot(false);
  }

  const handleFeedbackClose = (_event: any, reason: SnackbarCloseReason) => {
    if (reason !== 'clickaway') {
      setShowEditFeedback(false);
    }
  }

  function getDialogContainer() {
    return (
    <Dialog
      open={showUnsavedChangesModal !== null}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to exit?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        You are currently editing, and you may have unsaved changes. Click 'Done' to save the changes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <sc.StyledButton onClick={handleClose} color="primary">
          Cancel
        </sc.StyledButton>
        <sc.StyledButton
          onClick={() => {
            setUnsavedChanges(!unsavedChanges); // ignore changes
            handleClose();
            setTimeout(() => showUnsavedChangesModal(), 500); // execute the handler
          }}
          color="primary"
          autoFocus
        >
          Exit
        </sc.StyledButton>
      </DialogActions>
    </Dialog>
    )
  }

  const contextValue = {
    setUnsavedChanges,
    unsavedChanges,
    setShowUnsavedChangesModal,
    updateItinerary,
  }  

  return (
    <ItineraryContext.Provider value={contextValue}>
      <Snackbar transitionDuration={1000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showEditFeedback} autoHideDuration={5000} onClose={handleFeedbackClose}>
        <Alert severity="success">
          Your itinerary has been updated
        </Alert>
      </Snackbar>
      <div>
        {isLoading ? (
          <sc.LoadingDiv>
            <div className="loader"></div>
            Trippo is getting your itinerary ready...
          </sc.LoadingDiv>
        ) : null}
        <sc.SearchContainer>
          <Searchbar>
            <GeocoderContainer ref={geocoderContainerRef} />
          </Searchbar>
        </sc.SearchContainer>
        <sc.ItineraryDiv>
          <Map
            geocoderContainerRef={geocoderContainerRef}
            handleIsLoading={handleIsLoading}
            handleNewSlotClick={handleNewSlotClick}
          />
          <sc.SideBar>
            <sc.StyledReceiptIcon>
              <ReceiptIcon onClick={handleShowExpenses}/>
            </sc.StyledReceiptIcon>
            <button onClick={handleOpenItinerary}>
              {showItinerary ? (
                <i className="fas fa-chevron-left"></i>
              ) : (
                <i className="fas fa-chevron-right"></i>
              )}
            </button>
          </sc.SideBar>
          
          {showItinerary ? (
            <sc.Container>
              <Container />
            </sc.Container> 
          ) : null}
          {showExpenses ? (
            <sc.Container>
              <ExpensePage />
          </sc.Container>
          ) : null}
          {
            canOpenNewSlot ? <NewSlot handleClose={handleNewSlotClose}/>
              : null
          }
        </sc.ItineraryDiv>
      </div>
      {
        getDialogContainer()
      }
    </ItineraryContext.Provider>
  );
}
export default ItineraryPage;
