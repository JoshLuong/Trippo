import {
    StyleSheet,
  } from "@react-pdf/renderer";

// use react-pdf create styles
export const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      fontSize: 12,
      padding: 20,
      paddingBottom: 40
    },
    section: {
      flexGrow: 1,
      flexDirection: "column",
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
      width: 25,
      position: "absolute",
      bottom: 3.5,
      right: 5,
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
    footer: {
      position: "absolute",
      bottom: 5,
      width: 842,
      right: 8
    },
    titleBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 842,
      height: 595,
    },
  });