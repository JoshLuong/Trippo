import { DestinationType } from '../types/destinationTypes';

const date1 = new Date(2022, 5, 20);
const date2 = new Date(2022, 5, 21);
const date3 = new Date(2022, 5, 22);


// need userID?
export const users = [
  { name: "Jane Doe", email: 'joshopolis321@gmail.com' },
  { name: "John Doe", email: 'johndoe@gmail.com' }
];

export const activities = [
  {
    location: {
      lat: 49.26765379043226,
      lng: -123.01076355931461,
    },
    time: new Date(new Date(2022, 5, 20).setHours(8)),
    destination: "Executive Suites Hotel Metro Vancouver",
    cost: 10,
    type: DestinationType.HOTEL,
    comments: ["unpack", "rest"],
    suggested: [
      {
        destination: "Aquarium",
        type: DestinationType.ATTRACTION,
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    location: {
      lat: 49.27165402656802,
      lng: -123.03652478992159,
    },
    time: new Date(date1.setHours(8)),
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
    location: {
      lat: 49.285092733418985,
      lng: -123.10905172120349,
    },
    time: new Date(date1.setHours(8)),
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
    location: {
      lat: 49.28576457262959,
      lng: -123.11214162567256,
    },
    time: new Date(date1.setHours(8)),
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
    location: {
      lat: 49.294650197799356,
      lng: -123.1502226187735,
    },
    time: new Date(date1.setHours(8)),
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
    location: {
      lat: 49.300908017505684,
      lng: -123.1309400304768,
    },
    time: new Date(date1.setHours(8)),
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
    location: {
      lat: 49.31422074208162,
      lng: -123.14227989101975,
    },
    time: new Date(date1.setHours(13)),
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
    location: {
      lat: 49.26765379043226,
      lng: -123.01076355931461,
    },
    time: new Date(date2.setHours(8)),
    destination: "Swimming pool",
    cost: 10,
    type: DestinationType.RESTAURANT,
    comments: ["swim", "eat"],
    suggested: [
      {
        destination: "Aquarium",
        type: DestinationType.AIRPORT,
        comments: "3 min away",
      },
      {
        destination: "Diner",
        comments: "10 min away",
      },
    ],
  },
  {
    location: {
      lat: 49.27165402656802,
      lng: -123.03652478992159,
    },
    time: new Date(date2.setHours(8)),
    destination: "Orange county mall",
    cost: 20,
    comments: ["shop", "rest"],
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
    location: {
      lat: 49.285092733418985,
      lng: -123.10905172120349,
    },
    time: new Date(date2.setHours(8)),
    destination: "Hotel",
    cost: 50,
    comments: ["sleep", "rest"],
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
    location: {
      lat: 49.28576457262959,
      lng: -123.11214162567256,
    },
    time: new Date(date2.setHours(8)),
    destination: "Cheescake Factory",
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
    location: {
      lat: 49.294650197799356,
      lng: -123.1502226187735,
    },
    time: new Date(date2.setHours(8)),
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
    location: {
      lat: 49.300908017505684,
      lng: -123.1309400304768,
    },
    time: new Date(date2.setHours(8)),
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
    location: {
      lat: 49.31422074208162,
      lng: -123.14227989101975,
    },
    time: new Date(date2.setHours(13)),
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
    location: {
      lat: 49.26765379043226,
      lng: -123.01076355931461,
    },
    time: new Date(date3.setHours(8)),
    destination: "English bay",
    cost: 10,
    type: DestinationType.BEACH,
    comments: ["swimming", "tanning"],
    suggested: [
      {
        destination: "Aquarium",
        type: DestinationType.BEACH,
        comments: "3 min away",
      },
      {
        destination: "Park",
        comments: "10 min away",
      },
    ],
  },
  {
    location: {
      lat: 49.27165402656802,
      lng: -123.03652478992159,
    },
    time: new Date(date3.setHours(8)),
    destination: "Pacific Center",
    cost: 20,
    type: DestinationType.SHOPPING,
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
    location: {
      lat: 49.285092733418985,
      lng: -123.10905172120349,
    },
    time: new Date(date3.setHours(8)),
    destination: "Hotel",
    type: DestinationType.HOTEL,
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
    location: {
      lat: 49.28576457262959,
      lng: -123.11214162567256,
    },
    time: new Date(date3.setHours(8)),
    destination: "Hotel",
    type: DestinationType.ATTRACTION,
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
    location: {
      lat: 49.294650197799356,
      lng: -123.1502226187735,
    },
    time: new Date(date3.setHours(8)),
    destination: "Hotel",
    type: DestinationType.PARK,
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
    location: {
      lat: 49.300908017505684,
      lng: -123.1309400304768,
    },
    time: new Date(date3.setHours(8)),
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
    location: {
      lat: 49.31422074208162,
      lng: -123.14227989101975,
    },
    time: new Date(date3.setHours(13)),
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


export const itineraries = [
  {
    name: "Hawaii 2022 Trip",
    budget: 1000,
    current_cost: 10,
    destination: "Honolulu, Hawaii",
    dest_coords: {
      lat: 49.3667,
      lng: -123.167,
    },
    collaborators: [],
    comments:
      "Our island-hopping Hawaii Trip planned for 2022; A 10 day adventure for the family",
    tags: ["Luau", "Surfing", "Shopping"],
    start_date: new Date(2022, 5, 20),
    end_date: new Date(2022, 5, 30),
    activities: activities,
    },
    {
    name: "Alaska 2021 Trip",
    current_cost: 300,
    destination: "Anchorage, Alaska",
    dest_coords: {
      lat: 49.3667,
      lng: -123.167,
    },
    collaborators: [],
    comments: "Our 7 day Alaskan cruise from Vancouver",
    tags: ["Cruise", "Sight-seeing"],
    start_date: new Date(2021, 5, 20),
    end_date: new Date(2021, 5, 27),
    activities: activities
  }
];
