import express from "express";
import { Yelp, Itinerary } from "database/models";

const router = express.Router();
const yelp = require("yelp-fusion");
const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

const updateItinerary = async (
  req: any,
  itineraryId: string,
  activityId: string,
  businessIds: string[]
) => {
  const itinerary = await Itinerary.findOne({
    $or: [
      { _id: itineraryId, user_id: req.session.userId },
      {
        _id: itineraryId,
        collaborators: { $elemMatch: { _id: req.session.userId } },
      },
    ],
  });
  const activity = itinerary?.activities.filter((activity: any) => {
    return activity._id == activityId;
  });
  if (activity && activity.length >= 1)
    activity[0]?.business_ids.push(...businessIds);
  itinerary?.save();
};

const filterYelpData = async (results: any, rating: number) => {
  const filteredResults = results.filter(
    (yelpData: any) =>
      yelpData.rating >= rating - 1 && yelpData.rating <= rating + 1
  );
  const randomIndex = Math.floor(
    Math.random() * (filteredResults.length - 2) + 2
  );
  const savedResults =
    filteredResults.length >= 2
      ? filteredResults.slice(randomIndex - 2, randomIndex)
      : filteredResults;
  return savedResults;
};

const saveYelpData = async (savedResults: any) => {
  let businessIds: string[] = [];
  for (let res of savedResults) {
    const result: any = res;
    const yelpData = { ...result, business_id: result.alias };
    businessIds.push(result.alias);
    await Yelp.findOneAndUpdate({ business_id: result.alias }, yelpData, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  return businessIds;
};

// use this endpoint when the user creates an activity with time between 6:00am - 11:00am
router.post("/restaurants/breakfast_brunch", async (req, res, _next) => {
  const {
    latitude,
    longitude,
    rating,
    price,
    distance,
    time,
    itineraryId,
    activityId,
  } = req.body;
  const searchRequest = {
    categories: "breakfast_brunch",
    latitude: latitude,
    longitude: longitude,
    price: price,
    radius: distance, // meters
    open_at: time.now,
    limit: 25,
  };

  client
    .search(searchRequest)
    .then(async (response: any) => {
      const results = response.jsonBody.businesses;
      const savedResults: any = await filterYelpData(results, rating);
      const businessIds = await saveYelpData(savedResults);

      await updateItinerary(req, itineraryId, activityId, businessIds);
      res.status(200).send(savedResults);
    })
    .catch((e: any) => {
      res.status(500).send({ error: e + "Could not resolve Yelp request" });
    });
});

// default restaurants (when time is 11am-2pm; 5pm-9pm)
router.post("/restaurants", async (req, res, _next) => {
  const {
    latitude,
    longitude,
    rating,
    price,
    distance,
    time,
    itineraryId,
    activityId,
  } = req.body;
  const searchRequest = {
    categories: "restaurants",
    latitude: latitude,
    longitude: longitude,
    price: price,
    radius: distance, // meters
    open_at: time.now,
    limit: 25,
  };

  client
    .search(searchRequest)
    .then(async (response: any) => {
      const results = response.jsonBody.businesses;
      const savedResults: any = await filterYelpData(results, rating);
      const businessIds = await saveYelpData(savedResults);
      await updateItinerary(req, itineraryId, activityId, businessIds);
      res.status(200).send(savedResults);
    })
    .catch((e: string) => {
      res.status(500).send({ error: e + "Could not resolve Yelp request" });
    });
});

// use this endpoint when the user creates an activity with time between 8:00pm - 3:00am
router.post("/nightlife", async (req, res, _next) => {
  const {
    latitude,
    longitude,
    distance,
    rating,
    time,
    itineraryId,
    activityId,
  } = req.body;
  const searchRequest = {
    categories: "bars,beergardens,comedyclubs,danceclubs,karaoke,poolhalls",
    latitude: latitude,
    longitude: longitude,
    radius: distance, // meters
    open_at: time.now,
    limit: 15,
  };

  client
    .search(searchRequest)
    .then(async (response: any) => {
      const results = response.jsonBody.businesses;
      const savedResults: any = await filterYelpData(results, rating);
      const businessIds = await saveYelpData(savedResults);

      await updateItinerary(req, itineraryId, activityId, businessIds);
      res.status(200).send(savedResults);
    })
    .catch((e: string) => {
      res.status(500).send({ error: e + "Could not resolve Yelp request" });
    });
});

// always use this
router.post("/attractions", async (req, res, _next) => {
  const {
    latitude,
    longitude,
    distance,
    rating,
    time,
    itineraryId,
    activityId,
  } = req.body;
  const activeLife =
    "amusementparks,aquariums,beaches,bikerentals,experiences,hiking,jetskis,lakes,parks,snorkeling,zoos";
  const artsAndEntertainment = `arcades,casinos,movietheaters,culturalcenter,festivals,museums,wineries`;
  const shopping = `cannabisdispensaries,publicmarkets,shoppingcenters,souvenirs`;
  const searchRequest = {
    categories: activeLife + "," + artsAndEntertainment + "," + shopping,
    latitude: latitude,
    longitude: longitude,
    open_at: time.now,
    radius: distance, // meters
    limit: 25,
  };

  client
    .search(searchRequest)
    .then(async (response: any) => {
      const results = response.jsonBody.businesses;
      const savedResults: any = await filterYelpData(results, rating);
      const businessIds = await saveYelpData(savedResults);
      await updateItinerary(req, itineraryId, activityId, businessIds);
      res.status(200).send(savedResults);
    })
    .catch((e: string) => {
      res.status(500).send({ error: e + "Could not resolve Yelp request" });
    });
});

// use this when displaying suggestions
router.post("/businesses", async (req, res, _next) => {
  const { itineraryId, activityId } = req.body;

  let businessIds: string[] = [];
  const itinerary = await Itinerary.findOne({ _id: itineraryId });
  const activity = itinerary?.activities.filter((activity: any) => {
    return activity._id == activityId;
  });
  if (activity && activity.length >= 1) {
    businessIds = activity[0]?.business_ids;
  }

  let businesses = await Yelp.find({ business_id: { $in: [...businessIds] } });
  let cachedBusinessIds = businesses.map((b) => b.business_id);

  if (businessIds.length != businesses.length) {
    // some aren't in DB
    for (const id of businessIds) {
      if (!cachedBusinessIds.includes(id)) {
        const yelpBusiness = await client.business(id);
        const business = await Yelp.create({
          ...yelpBusiness.jsonBody,
          business_id: yelpBusiness.jsonBody.alias,
        });
        businesses.push(business);
      }
    }
  }
  try {
    res.status(200).send(businesses);
  } catch (e) {
    res.status(404).send({ error: e + "Could not send display businesses" });
  }
});

export default router;
