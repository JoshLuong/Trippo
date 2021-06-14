import { FC } from "react";
import * as sc from "./ItineraryCard.styles";
import moment from "moment";
import { Grid } from "@material-ui/core";

interface Props {
  card: any;
  showEdit: boolean;
  handleRemove: () => void;
}

const renderNames = (name: string, collaborators: string) => {
  return (
    <sc.NameGrid container item lg={8} sm={12}>
      <sc.TripName>{name}</sc.TripName>
      <sc.Collaborators>
        <sc.StyledPeopleIcon />
        {collaborators}
      </sc.Collaborators>
    </sc.NameGrid>
  );
};

const ItineraryCard: FC<Props> = ({ card, showEdit, handleRemove }) => {
  let collaborators = card.collaborators.reduce(
    (str: string, c: any, index: number) => {
      if (index === 2) {
        return str + ` + ${card.collaborators.length - 2} others`;
      }
      if (index >= 2) {
        return str;
      }
      return str + ", " + c;
    }
  );
  return (
    <sc.Card>
      <Grid container item lg={12}>
        <Grid container item lg={8} sm={12}>
          {renderNames(card.tripName, collaborators)}
        </Grid>
        <sc.DateGrid container item lg={4} sm={12}>
          <i className="far fa-calendar-alt"></i>
          {moment(card.startDate).format("MMM Do YYYY") +
            ` - ` +
            moment(card.endDate).format("MMM Do YYYY")}
        </sc.DateGrid>
        <sc.CommentGrid container item lg={12}>
          {card.description}
        </sc.CommentGrid>
        <sc.LabelGrid container item lg={12}>
          {card.labels.map((card: any, index: number) => {
            return (
              <sc.LabelDiv key={index}>
                <sc.StyledLabelIcon />
                {card}
              </sc.LabelDiv>
            );
          })}
        </sc.LabelGrid>
        {showEdit ? (
          <sc.EditGrid container item lg={12}>
            <sc.EditButton onClick={handleRemove}>
              <i className="fas fa-minus-circle"></i>
            </sc.EditButton>
          </sc.EditGrid>
        ) : null}
      </Grid>
    </sc.Card>
  );
};

export default ItineraryCard;
