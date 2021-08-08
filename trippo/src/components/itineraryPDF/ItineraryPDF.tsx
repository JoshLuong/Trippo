import React, { FC } from "react";
import * as d from "../../app/destinations/destinationTypes";
import * as utils from "../itineraryEdit/utils";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { Activity, Itinerary, User } from "types/models";
import { getDates } from "../itineraryReadOnlyView/ItineraryReadOnlyView";
import moment from "moment";

interface Props {
  itinerary: Itinerary;
  user: User;
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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontSize: 12,
    padding: 20,
  },
  section: {
    flexGrow: 1,
    flexDirection: "column",
    paddingBottom: 30,
  },
  activityContent: {
    margin: 5,
    padding: 7,
    borderRightColor: "#EEEEEE",
    borderRightWidth: 2,
  },
  address: {
    color: "#474747",
    paddingTop: 4,
  },
  comments: {
    paddingTop: 7,
    paddingLeft: 12,
    fontSize: 11,
  },
  activity: {
    margin: 7,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F4F4F4 ",
    borderLeftWidth: 1,
    borderLeftColor: "#F4F4F4 ",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2,
    borderRightColor: "#EEEEEE",
    borderRightWidth: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  date: {
    paddingLeft: 5,
    color: "#219EBC",
  },
  destination: {
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: "row",
    paddingBottom: 8,
  },
  day: {
    alignSelf: "flex-end",
  },
  destinationHeader: {
    alignSelf: "center",
    fontSize: 15,
    paddingBottom: 8,
  },
  title: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 520,
    width: 747,
    backgroundColor: "#FFFFFF99",
    borderRadius: 3,
  },
  titlePage: {
    justifyContent: "center",
    display: "flex",
    fontSize: 20,
  },
  logo: {
    width: 200,
  },
  titleDates: {
    fontSize: 10,
    paddingTop: 4,
    textAlign: "center",
    color: "#FB8500",
  },
  time: {
    padding: 7,
  },
  headerComments: {
    fontSize: 14,
    paddingTop: 8,
    color: "#474747",
  },
  headerCollaborators: {
    fontSize: 13,
    color: "#474747",
    paddingTop: 8,
    width: 400,
    textAlign: "center",
  },
  headerNames: {
    fontSize: 11,
    paddingTop: 8,
    color: "#474747",
  },
  distanceContainer: {
    flexDirection: "column",
  },
  distance: {
    fontSize: 10,
    marginLeft: 15,
    paddingLeft: 5,
    paddingTop: 4,
    paddingBottom: 4,
    color: "#474747",
  },
  icon: {
    alignSelf: "flex-end",
    width: 30,
    position: "absolute",
    bottom: 0,
    right: 3,
    padding: 4,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 9,
    right: 40,
    textAlign: "center",
    color: "#474747",
  },
  titleBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 842,
    height: 595,
  },
});
// Create Document Component
const ItineraryPDF: FC<Props> = ({ itinerary, user }) => {
  const dates = itinerary && getDates(itinerary.start_date, itinerary.end_date);
  return (
    <Document>
      <Page orientation="landscape" size="A4" style={styles.titlePage}>
        <Image style={styles.titleBackground} src="/about.jpg" />
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
      {dates?.map((date) => {
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
                {itinerary.destination}
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
            <View fixed>
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
