
import express from 'express';
import { User } from 'database/models';

const router = express.Router();
const yelp = require('yelp-fusion');
const apiKey = '_QD5PLIiaaZPpX8HmvKCf-3Wr4J7HJ5e7KRNmxXe4OEgMAw-lRfsIGuFigACboB7194feK745rnMZ0XB9Fwo81opM-iKGJC_Ib8YBPOmfLL1x5NvxAMFMixmu6r9YHYx';

// use this endpoint when the user creates an activity with time between 6:00am - 11:00am
router.post('/restaurants/breakfast_brunch', async (req, res, _next) => {
    const {latitude, longitude, rating, price, distance, time} = req.body;
    const searchRequest = {
        categories: 'breakfast_brunch',
        latitude: latitude,
        longitude: longitude,
        price: price,
        radius: distance, // meters
        open_at: Date.now, // TODO: test purposing, should use the time from req.body
        limit: 50
      };
    
    const client = yelp.client(apiKey);

    client.search(searchRequest).then((response: any) => {
        const results = response.jsonBody.businesses;
        const filteredResults = results.filter((restaurant: any) => restaurant.rating >= rating - 1 && restaurant.rating <= rating + 1);
        res.status(200).send(filteredResults);
    }).catch((e: string) => {
    console.log(e);
        res.status(500);
    });
});

// default restaurants
router.post('/restaurants', async (req, res, _next) => {
    const {latitude, longitude, rating, price, distance, time} = req.body;
    const searchRequest = {
        categories: 'restaurants',
        latitude: latitude,
        longitude: longitude,
        price: price,
        radius: distance, // meters
        open_at: Date.now, // TODO: test purposing, should use the time from req.body (accepts unix int (use time.now if time is Date))
        limit: 50
      };
    
    const client = yelp.client(apiKey);

    client.search(searchRequest).then((response: any) => {
        const results = response.jsonBody.businesses;
        const filteredResults = results.filter((restaurant: any) => restaurant.rating >= rating - 1 && restaurant.rating <= rating + 1);
        res.status(200).send(filteredResults);
    }).catch((e: string) => {
    console.log(e);
        res.status(500);
    });
});

// use this endpoint when the user creates an activity with time between 8:00pm - 3:00am
router.post('/nightlife', async (req, res, _next) => {
    const {latitude, longitude, distance, rating, time} = req.body;
    const searchRequest = {
        categories: 'bars,beergardens,comedyclubs,danceclubs,karaoke,poolhalls',
        latitude: latitude,
        longitude: longitude,
        open_at: Date.now,
        radius: distance, // meters
        limit: 50
      };
    
    const client = yelp.client(apiKey);

    client.search(searchRequest).then((response: any) => {
        const results = response.jsonBody.businesses;
        const filteredResults = results.filter((attraction: any) => attraction.rating >= rating - 1 && attraction.rating <= rating + 1);
        res.status(200).send(filteredResults);
    }).catch((e: string) => {
    console.log(e);
        res.status(500);
    });
});


router.post('/attractions', async (req, res, _next) => {
    const {latitude, longitude, distance, rating, time} = req.body;
    const activeLife = 'amusementparks,aquariums,beaches,bikerentals,experiences,hiking,jetskis,lakes,parks,snorkeling,zoos';
    const artsAndEntertainment = `arcades,casinos,movietheaters,culturalcenter,festivals,museums,wineries`;
    const shopping = `cannabisdispensaries,publicmarkets,shoppingcenters,souvenirs`;
    const searchRequest = {
        categories: activeLife + ',' + artsAndEntertainment + ',' + shopping,
        latitude: latitude,
        longitude: longitude,
        open_at: Date.now,
        radius: distance, // meters
        limit: 50
      };
    
    const client = yelp.client(apiKey);

    client.search(searchRequest).then((response: any) => {
        const results = response.jsonBody.businesses;
        const filteredResults = results.filter((attraction: any) => attraction.rating >= rating - 1 && attraction.rating <= rating + 1);
        res.status(200).send(filteredResults);
    }).catch((e: string) => {
    console.log(e);
        res.status(500);
    });
});

export default router;

  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app

