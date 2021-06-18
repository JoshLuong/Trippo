import { DestinationType } from "app/destinations/destinationTypes";
import { TimeSlot } from "app/reducers/timeSlotSlice";

export const getMockTimeSlots = (date: Date): TimeSlot[] => [
  {
    id: 1,
    location: {
      lat: 49.26765379043226,
      lng: -123.01076355931461,
    },
    time: new Date(date.setHours(8)),
    destination: "Executive Suites Hotel Metro Vancouver",
    cost: 10,
    type: DestinationType.HOTEL,
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        type: DestinationType.OTHER,
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    id: 2,
    location: {
      lat: 49.27165402656802,
      lng: -123.03652478992159,
    },
    time: new Date(date.setHours(8)),
    destination: "Hotel",
    cost: 20,
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    id: 3,
    location: {
      lat: 49.285092733418985,
      lng: -123.10905172120349,
    },
    time: new Date(date.setHours(8)),
    destination: "Hotel",
    cost: 50,
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    id: 4,
    location: {
      lat: 49.28576457262959,
      lng: -123.11214162567256,
    },
    time: new Date(date.setHours(8)),
    destination: "Hotel",
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    id: 5,
    location: {
      lat: 49.294650197799356,
      lng: -123.1502226187735,
    },
    time: new Date(date.setHours(8)),
    destination: "Hotel",
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    id: 6,
    location: {
      lat: 49.300908017505684,
      lng: -123.1309400304768,
    },
    time: new Date(date.setHours(8)),
    destination: "Hotel",
    comments: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "rest",
    ],
    suggested: [
      {
        destination: "Aquarium",
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    id: 7,
    location: {
      lat: 49.31422074208162,
      lng: -123.14227989101975,
    },
    time: new Date(date.setHours(13)),
    destination: "Hotel",
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
];
