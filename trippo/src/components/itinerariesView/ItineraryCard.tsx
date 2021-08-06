import React, { FC } from "react";
import FadeIn from "react-fade-in";
import * as sc from "./ItineraryCard.styles";
import * as c from "../../colors/colors";
import moment from "moment";
import { Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Itinerary } from "types/models";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAppSelector } from "app/store";
import { User } from "types/models";
import { useGetUserByIdQuery } from "services/user";
import MainEditItineraryContainer from "components/itineraryForm/MainEditItineraryContainer";
import { useEffect } from "react";

interface Props {
  updateItinerary: (arg: Partial<Itinerary>) => any;
  card: Itinerary;
  handleRemove: () => void;
  setSuccess: (isSuccessful: boolean) => void;
}

const renderNames = (
  name: string,
  card: Itinerary,
  user: User,
  result: User
) => {
  const { collaborators } = card;
  const users = collaborators.slice();
  let names = "";

  names = `${result.name} (owner)`;

  if (users.length === 1) {
    names += `, ${users[0].name}`;
  } else if (users.length === 2) {
    names += `, ${users[0].name} and ${users[1].name}`;
  } else if (users.length === 3) {
    names += `, ${users[0].name}, ${users[1].name} + 1 other`;
  } else if (users.length > 3) {
    names += `, ${users[0].name}, ${users[1].name} + ${users.length - 2} others`;
  }

  return (
    <sc.NameGrid container item lg={8} sm={12}>
      <sc.TripName href={`./itinerary/${card._id}`}>{name}</sc.TripName>
      <sc.Collaborators>
        <sc.StyledPeopleIcon />
        {names}
      </sc.Collaborators>
    </sc.NameGrid>
  );
};

const ItineraryCard: FC<Props> = ({
  setSuccess,
  card,
  handleRemove,
  updateItinerary,
}) => {
  const user = useAppSelector((state) => state.user.value);
  const { data: result } = useGetUserByIdQuery(card.user_id);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <React.Fragment>
      {edit && (
        <MainEditItineraryContainer
          card={card}
          openDialog={handleClickOpen}
          handleShowEditItinerary={handleEdit}
          setSuccess={setSuccess}
          updateItinerary={updateItinerary}
        />
      )}
      <FadeIn transitionDuration={800} delay={500}>
        <sc.Card
          color={card.user_id === user?._id ? c.DARK_BLUE : c.DARK_ORANGE}
        >
          <Grid item container lg={12}>
            <Grid container item lg={7} sm={12}>
              {user && result && renderNames(card.name, card, user, result)}
            </Grid>
            <sc.DateGrid container item lg={5} sm={12}>
              <i className="far fa-calendar-alt"></i>
              <span>{moment(card.start_date).format("MMM Do YYYY") +
                ` - ` +
                moment(card.end_date).format("MMM Do YYYY")}
              </span>
            </sc.DateGrid>
            <sc.StyledIconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleEdit}
            >
              <EditIcon style={{ color: c.BLACK }} />
            </sc.StyledIconButton>
            <sc.CommentGrid container item lg={12}>
              {card.comments}
            </sc.CommentGrid>
            {card.tags && (
              <sc.LabelGrid container item lg={12}>
                {card.tags.map((card: any, index: number) => {
                  return (
                    <sc.LabelDiv key={index}>
                      <sc.StyledLabelIcon />
                      {card}
                    </sc.LabelDiv>
                  );
                })}
              </sc.LabelGrid>
            )}
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete {<strong>{card.name}</strong>}
                  ?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Deleting {<strong>{card.name}</strong>} will permanently
                    remove it from your itineraries list.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <sc.StyledButton onClick={handleClose} color="primary">
                    Cancel
                  </sc.StyledButton>
                  <sc.StyledButton
                    onClick={() => {
                      handleRemove();
                      handleClose();
                      handleEdit();
                    }}
                    color="primary"
                    autoFocus
                  >
                    Delete
                  </sc.StyledButton>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </sc.Card>
      </FadeIn>
    </React.Fragment>
  );
};

export default ItineraryCard;
