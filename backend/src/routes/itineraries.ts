import express from 'express';
import { Itinerary } from 'database/models';

const router = express.Router();

router.get('/', async (_req, res, _next) => {
  const itineraries = await Itinerary.find({});
  res.status(200).send(itineraries.map(e => e.toObject()));
});

router.delete('/deleteItinerary', async (_req, res, _next) => {
  try {
    await Itinerary.deleteOne({}), async () => {
        let editedItinerariesList = await Itinerary.find({});
        res.status(200).send(editedItinerariesList.map(e => e.toObject()));
    }
  } catch (err) {
    res.send(err)
  }
});

export default router;
