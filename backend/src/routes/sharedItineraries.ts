import express from "express";
import { Itinerary, ShareableItinerary } from "database/models";

const router = express.Router();

router.get("/:id", async (req: any, res, _next) => {
  const { id } = req.params;
  const shareObject = await ShareableItinerary.findOne({ _id: id });
  if (!shareObject)
    return res.status(404).send({ error: "This itinerary does not exist" });
  const itinerary = await Itinerary.findOne({ _id: shareObject.itinerary_id });
  res.status(200).send(itinerary);
});

export default router;
