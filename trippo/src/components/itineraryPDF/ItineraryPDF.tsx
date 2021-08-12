import React, { FC } from "react";
import * as d from "../icons";
import * as utils from "../itineraryEdit/utils";
import { Document, Page, Text, View, Link, Image } from "@react-pdf/renderer";
import { styles } from "./ItineraryPDF.styles";
import { Activity, Itinerary, User } from "types/models";
import { getDates } from "../itineraryReadOnlyView/ItineraryReadOnlyView";
import moment from "moment";

interface Props {
  itinerary: Itinerary;
  user: User;
  imageURL?: ArrayBuffer | null;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Create Document Component
const ItineraryPDF: FC<Props> = ({ itinerary, user, imageURL }) => {
  const dates = itinerary && getDates(itinerary.start_date, itinerary.end_date);
  return (
    <Document>
      <Page orientation="landscape" size="A4" style={styles.titlePage}>
        <Image
          style={styles.titleBackground}
          src={!imageURL ? "/about.jpg" : (imageURL as Buffer)}
        />
        <View style={styles.title}>
          <Image style={styles.logo} src="/trippo.png" />
          <Link
            src={`https://trippoapp.herokuapp.com/itinerary/${itinerary._id}`}
          >
            {itinerary.name}
          </Link>
          <Text style={styles.titleDates}>
            {moment(itinerary?.start_date).format("MMM Do YYYY") +
              ` - ` +
              moment(itinerary?.end_date).format("MMM Do YYYY")}
          </Text>
          <Text style={styles.headerComments}>{itinerary.comments}</Text>
          <Text style={styles.headerCollaborators}>
            {user.name} (owner)
            {itinerary.collaborators.map((collaborator, i) => {
              let name = `, ${collaborator.name}`;
              if (i > 0 && i === itinerary.collaborators.length - 1)
                name = `, and ${collaborator.name}`;
              return name;
            })}
          </Text>
        </View>
      </Page>
      {dates?.map((date, i) => {
        const dayActivities = itinerary?.activities.filter((activity: any) =>
          moment(date).isSame(moment(activity.time), "date")
        );
        let prevActivity: Activity | null = null;

        return (
          <Page orientation="landscape" size="A4" style={styles.page}>
            <View style={styles.destinationHeader}>
              <Link
                src={`https://trippoapp.herokuapp.com/itinerary/${itinerary._id}`}
              >
                Day {i + 1} in {itinerary.destination}
              </Link>
            </View>
            <View style={styles.dateContainer} fixed>
              <Text style={styles.date}>
                {days[moment(date).isoWeekday() - 1]},
              </Text>
              <Text style={styles.date}>
                {moment(date).format("MMMM Do YYYY")}
              </Text>
            </View>
            <View style={styles.section}>
              {dayActivities
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((activity: Activity) => {
                  const prevDistance = prevActivity
                    ? utils.getDistanceFromLatLonInKm(
                        prevActivity.location?.lat,
                        prevActivity.location?.lng,
                        activity.location.lat,
                        activity.location.lng
                      )
                    : -1;
                  prevActivity = activity;
                  return (
                    <View style={styles.distanceContainer} wrap={false}>
                      {prevDistance >= 0 && (
                        <Text style={styles.distance}>
                          {`${prevDistance} kms away`}
                        </Text>
                      )}
                      <View style={styles.activity} wrap={false}>
                        <Text style={styles.time}>
                          {moment(
                            new Date(activity.time),
                            "dd DD-MMM-YYYY, hh:mm"
                          ).format("hh:mm A")}
                        </Text>
                        <View
                          style={{
                            margin: 5,
                            padding: 7,
                            paddingLeft: 8,
                            borderLeftColor: d.getIconHexColor(activity.type),
                            borderLeftWidth: 2,
                          }}
                        >
                          <Text style={styles.destination}>
                            {activity.destination}
                          </Text>
                          <Text style={styles.address}>{activity.address}</Text>
                          {activity.comments?.length > 0 &&
                            activity.comments[0] !== "" &&
                            activity.comments.map((comment) => (
                              <Text
                                style={styles.comments}
                              >{`•  ${comment}`}</Text>
                            ))}
                        </View>
                      </View>
                    </View>
                  );
                })}
            </View>
            <View style={styles.footer} fixed>
              <Text
                style={styles.pageNumber}
                render={({ pageNumber }) => `page ${pageNumber - 1}`}
              />
              <Image style={styles.icon} src="/trippo-icon.png" />
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default ItineraryPDF;
