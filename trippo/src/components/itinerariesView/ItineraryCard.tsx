import React, { FC } from "react";
import * as sc from "./ItineraryCard.styles";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { Itinerary } from "types/models";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  card: Itinerary;
  showEdit: boolean;
  handleRemove: () => void;
}

const renderNames = (name: string, card: Itinerary) => {
  const { collaborators: users } = card;
  let names = "";

  if (users.length === 1) {
    names = users[0].name;
  } else if (users.length === 2) {
    names = `${users[0].name} and ${users[1].name}`;
  } else if (users.length === 3) {
    names = `${users[0].name}, ${users[1].name} + 1 other`;
  } else if (users.length > 3) {
    names = `${users[0].name}, ${users[1].name} + ${users.length - 2} others`;
  }

  return (
    <sc.NameGrid container item lg={8} sm={12}>
      <sc.TripName href="./itinerary">{name}</sc.TripName>
      <sc.Collaborators>
        <sc.StyledPeopleIcon />
        {names}
      </sc.Collaborators>
    </sc.NameGrid>
  );
};


const ItineraryCard: FC<Props> = ({ card, showEdit, handleRemove }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <sc.Card>
      <Grid container item lg={12}>
        <Grid container item lg={8} sm={12}>
          {renderNames(card.name, card)}
        </Grid>
        <sc.DateGrid container item lg={4} sm={12}>
          <i className="far fa-calendar-alt"></i>
          {moment(card.start_date).format("MMM Do YYYY") +
            ` - ` +
            moment(card.end_date).format("MMM Do YYYY")}
        </sc.DateGrid>
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
        {showEdit ? (
          <sc.EditGrid container item lg={12}>
            <div>
              <sc.EditButton onClick={handleClickOpen}>
                <i className="fas fa-minus-circle"></i>
              </sc.EditButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete {<strong>{card.name}</strong>}?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Deleting {<strong>{card.name}</strong>} will permanently remove it from your
                    itineraries list.
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
                      setTimeout(() => {
                        window.location.reload();
                      }, 100)
                    }}
                    color="primary"
                    autoFocus
                  >
                    Delete
                  </sc.StyledButton>
                </DialogActions>
              </Dialog>
            </div>
          </sc.EditGrid>
        ) : null}
      </Grid>
    </sc.Card>
  );
};

export default ItineraryCard;
