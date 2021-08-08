import React, { useEffect, useRef, useState } from "react";
import "./loading.css";
import Container from "../itineraryEdit/Container";
import { debounce } from "lodash";
import * as sc from "./ItineraryPage.styles";
import Map from "../map/Map";
import "../map/Map.css";
import { GeocoderContainer } from "components/map/Map.styles";
import Searchbar from "components/searchBar/Searchbar";
import ViewListIcon from "@material-ui/icons/ViewList";
import NewSlot from "components/itineraryEdit/NewSlot";
import ItineraryPDF from "../itineraryPDF/ItineraryPDF";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/store";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetItineraryByIdQuery,
  useUpdateItineraryMutation,
} from "services/itinerary";
import { useGetUserByIdQuery } from "services/user";
import { setItinerary } from "app/reducers/itinerarySlice";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Activity, Itinerary, ActivityPopup } from "types/models";
import ItineraryReadOnlyView from "components/itineraryReadOnlyView/ItineraryReadOnlyView";

export type ContextInterface = {
  setUnsavedChanges: (value: any) => void;
  unsavedChanges: boolean;
  setShowUnsavedChangesModal: (value: any) => void;
  updateItinerary: (value: Itinerary) => void;
  activeDay: Date | null;
  setActiveDay: (date: Date | null) => void;
  activityPopups: ActivityPopup[];
  handleSetActivityPopups: (slot: Activity) => void;
} | null;

export const ItineraryContext = React.createContext<ContextInterface>(null);

let destinationName: string;
let destinationAddress: string;
let destinationLat: number;
let destinationLng: number;

function ItineraryPage() {
  const history = useHistory();
  const IS_SHARED = history.location.pathname.includes("/shared");
  const [showSharedItineraryToast, setShowSharedItineraryToast] =
    useState(false);
  const [showItinerary, setShowItinerary] = useState(true);
  const [showItineraryReadOnlyView, setShowItineraryReadOnlyView] =
    useState(false);
  const [showEditFeedback, setShowEditFeedback] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  // populate with the handler the user wants to execute
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] =
    useState<any>(null);
  const geocoderContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canOpenNewSlot, setCanOpenNewSlot] = useState(false);
  const [closeSlotNewActivity, setCloseSlotNewActivity] = useState(false);
  const [closeSlotNoActivity, setCloseSlotNoActivity] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [sharedItinerary, setSharedItinerary] = useState<Itinerary | null>(
    null
  );
  const [isInvalidSharedLink, setIsInvalidSharedLink] = useState(false);
  const { data: editableItinerary } = useGetItineraryByIdQuery(id);
  const itinerary = IS_SHARED ? sharedItinerary : editableItinerary;
  const { data: user } = useGetUserByIdQuery(itinerary?.user_id);
  const [activityPopups, setActivityPopups] = useState<ActivityPopup[]>([]);
  const [showCustomizePDF, setShowCustomizePDF] = useState(false);
  const [customURL, setCustomURL] = useState<string>("");
  const [activeDay, setActiveDay] = useState<Date | null>(
    itinerary?.start_date || null
  );
  const [updateItinerary, { isLoading: isUpdating, data: updatedItinerary }] =
    useUpdateItineraryMutation();
  const [searchResult, setSearchResult] = useState<any>(null);
  const handleSetActivityPopups = (slot: Activity) => {
    const activityPopup: ActivityPopup = {
      _id: slot._id,
      destination: slot.destination,
      time: slot.time,
      location: slot.location,
    };
    const arrSize = activityPopups.length;
    const filteredArray = activityPopups.filter(
      (a: ActivityPopup) => a._id !== activityPopup._id
    );
    const newActivityPopup: ActivityPopup[] =
      filteredArray.length === arrSize
        ? [...activityPopups, activityPopup]
        : filteredArray;
    setActivityPopups(newActivityPopup);
  };

  const handleCloseSharedItineraryToast = () => {
    setShowSharedItineraryToast(false);
  };

  useEffect(() => {
    if (IS_SHARED) {
      fetch(`/api/shared/itineraries/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((itinerary) => {
          if (itinerary.error) {
            setIsInvalidSharedLink(true);
            return;
          }
          dispatch(setItinerary(itinerary));
          setSharedItinerary(itinerary);
          setShowSharedItineraryToast(true);
        });
    }
  }, []);

  useEffect(() => {
    if (updatedItinerary || closeSlotNewActivity) {
      dispatch(setItinerary(updatedItinerary));
      setShowEditFeedback(true);
      setCloseSlotNewActivity(false);
    } else if (!isUpdating) {
      dispatch(setItinerary(itinerary));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary, updatedItinerary, isUpdating, closeSlotNewActivity]);

  // tip: to use showUnsavedChangesModal, pass in handler function the user wants to execute when there are unsaved changes,
  // but the function should not handle any unsavedChanges state, as it will reference the old state from when the function
  // was called (here we employ a bypass by calling handleOpenItineraryNoChanges)
  function handleOpenItinerary() {
    if (unsavedChanges) {
      setShowUnsavedChangesModal(() => handleOpenItineraryNoChanges);
      return;
    }
    handleOpenItineraryNoChanges();
  }

  function handleOpenItineraryNoChanges() {
    setShowItinerary(!showItinerary);
    setShowItineraryReadOnlyView(false);
  }

  function handleClose() {
    setShowUnsavedChangesModal(null);
  }

  function handleReadOnlyView() {
    if (unsavedChanges) {
      setShowUnsavedChangesModal(() => handleReadOnlyViewNoChanges);
      return;
    }
    handleReadOnlyViewNoChanges();
  }

  function handleReadOnlyViewNoChanges() {
    setShowItineraryReadOnlyView(!showItineraryReadOnlyView);
    setShowItinerary(false);
  }

  function handleIsLoading() {
    setIsLoading(!isLoading);
  }

  function handleNewSlotClick(
    name: string,
    address: string,
    lat: number,
    lng: number
  ) {
    destinationName = name;
    destinationAddress = address;
    destinationLat = lat;
    destinationLng = lng;
    setCanOpenNewSlot(true);
  }

  function handleNewSlotClose() {
    setCanOpenNewSlot(false);
    setCloseSlotNoActivity(true);
  }

  function handleNewSlotSubmitAndClose() {
    setCanOpenNewSlot(false);
    setCloseSlotNewActivity(true);
  }

  const handleFeedbackClose = (_event: any, reason: SnackbarCloseReason) => {
    if (reason !== "clickaway") {
      setShowEditFeedback(false);
      setCloseSlotNoActivity(false);
    }
  };

  function getCustomizeablePDFDialog() {
    const handleChange = debounce((e: any) => {
      console.log(e.target.value)
      setCustomURL(e.target.value)
    }, 500);
    return itinerary && user && (
      <Dialog
        open={showCustomizePDF}
        onClose={() => setShowCustomizePDF(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Customize your PDF!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a <strong>custom</strong> background image, or leave it blank to use the provided default image.
            <br/>
            For best results, find a high resolution image and copy the 'Image address' into the below field:
          </DialogContentText>
          <sc.StyledTextField onChange={handleChange} id="standard-basic" label="Image URL" />
        </DialogContent>
        <DialogActions>
        <sc.StyledPDFDownloadLink
              document={<ItineraryPDF imageURL={customURL} itinerary={itinerary} user={user} />}
              fileName={`${itinerary.name.replace(/\s/g, "_")}.pdf`}
            >
              {() => (
                <span>Export</span>
              )}
        </sc.StyledPDFDownloadLink>
        </DialogActions>
      </Dialog>
    );
  }

  function getInvalidItineraryDialog() {
    return (
      <Dialog
        open={isInvalidSharedLink && !isLoading}
        onClose={() => setIsInvalidSharedLink(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Oops! It looks like the itinerary you're trying to view doesn't exist!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please make sure the link is correct, or log in to start creating
            itineraries!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <sc.StyledButton
            onClick={() => {
              setIsInvalidSharedLink(false);
              history.push("/");
            }}
            color="primary"
            autoFocus
          >
            Okay
          </sc.StyledButton>
        </DialogActions>
      </Dialog>
    );
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
            You are currently editing, and you may have unsaved changes. Click
            'Done' to save the changes.
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
    );
  }

  const contextValue = {
    setUnsavedChanges,
    unsavedChanges,
    setShowUnsavedChangesModal,
    updateItinerary,
    activeDay,
    setActiveDay,
    activityPopups,
    handleSetActivityPopups,
  };

  return (
    <ItineraryContext.Provider value={contextValue}>
      <Snackbar
        transitionDuration={700}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showEditFeedback}
        autoHideDuration={1300}
        onClose={handleFeedbackClose}
      >
        <Alert severity="success">Your itinerary has been updated</Alert>
      </Snackbar>
      <Snackbar
        transitionDuration={700}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={closeSlotNoActivity}
        autoHideDuration={1300}
        onClose={handleFeedbackClose}
      >
        <Alert severity="warning">Your itinerary was not changed</Alert>
      </Snackbar>
      <sc.ItineraryPage>
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
            searchResult={searchResult}
            setSearchResult={setSearchResult}
          />
          <sc.SideBar disabled={IS_SHARED}>
              <sc.StyledPDFButton onClick={() => setShowCustomizePDF(true)}>
                  <Tooltip title="Export to PDF" aria-label="Export to PDF">
                    <sc.StyledPictureAsPdfIcon />
                  </Tooltip>
              </sc.StyledPDFButton>
            <sc.StyledViewListIcon>
              <Tooltip
                title="Itinerary master plan"
                aria-label="Itinerary master plan"
              >
                <ViewListIcon onClick={handleReadOnlyView} />
              </Tooltip>
            </sc.StyledViewListIcon>
            <button onClick={handleOpenItinerary} disabled={IS_SHARED}>
              {showItinerary ? (
                <i className="fas fa-chevron-left"></i>
              ) : (
                <i className="fas fa-chevron-right"></i>
              )}
            </button>
          </sc.SideBar>

          {showItinerary && !IS_SHARED ? (
            <sc.Container>
              <Container />
            </sc.Container>
          ) : null}
          {showItineraryReadOnlyView ? (
            <sc.Container>
              <ItineraryReadOnlyView />
            </sc.Container>
          ) : null}
          {canOpenNewSlot ? (
            <NewSlot
              handleClose={handleNewSlotClose}
              handleSubmitAndClose={handleNewSlotSubmitAndClose}
              destinationName={destinationName}
              destinationAddress={destinationAddress}
              destinationLat={destinationLat}
              destinationLng={destinationLng}
              setSearchResult={setSearchResult}
            />
          ) : null}
        </sc.ItineraryDiv>
      </sc.ItineraryPage>
      {getDialogContainer()}
      {getInvalidItineraryDialog()}
      {getCustomizeablePDFDialog()}
      {!isLoading && (
        <Snackbar
          transitionDuration={500}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={showSharedItineraryToast}
        >
          <Alert onClose={handleCloseSharedItineraryToast} severity="warning">
            You have <strong>restricted</strong> read-only access for this itinerary. 
            <br/>
            To get write access, please ask the owner to add you as a collaborator.
          </Alert>
        </Snackbar>
      )}
    </ItineraryContext.Provider>
  );
}
export default ItineraryPage;
