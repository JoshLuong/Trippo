import React, { FC } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { Activity, Itinerary } from "types/models";
import { getDates } from "../itineraryReadOnlyView/ItineraryReadOnlyView";
import moment from "moment";

interface Props {
  itinerary: Itinerary;
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
  },
  activityContent: {
    marginBottom: 5,
    padding: 7,
  },
  address: {
    color: "#474747",
    paddingTop: 4,
  },
  comments: {
    paddingTop: 7,
    paddingLeft: 12,
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
    fontSize: 12,
    paddingTop: 4,
  },
  time: {
    padding: 5,
  },
  headerComments: {
    fontSize: 14,
    paddingTop: 8,
    color: "#474747",
  },
});
// Create Document Component
const ItineraryPDF: FC<Props> = ({ itinerary }) => {
  const dates = itinerary && getDates(itinerary.start_date, itinerary.end_date);
  return (
    <Document>
      <Page orientation="landscape" size="A4" style={styles.titlePage}>
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
        </View>
      </Page>
      {dates?.map((date) => {
        const dayActivities = itinerary?.activities.filter((activity: any) =>
          moment(date).isSame(moment(activity.time), "date")
        );
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
                {moment(date).format("MMMM Do YYYY")}
              </Text>
              <Text style={styles.date}>
                {days[moment(date).isoWeekday() - 1]}
              </Text>
            </View>
            <View style={styles.section}>
              {dayActivities
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((activity: Activity) => {
                  return (
                    <View style={styles.activity} wrap={false}>
                      <Text style={styles.time}>
                        {moment(
                          new Date(activity.time),
                          "dd DD-MMM-YYYY, hh:mm"
                        ).format("hh:mm A")}
                      </Text>
                      <View style={styles.activityContent}>
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
                  );
                })}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default ItineraryPDF;
