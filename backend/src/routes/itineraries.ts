import express from 'express';
import { Itinerary, Activity } from 'database/models';

const router = express.Router();

router.get('/', async (req: any, res, _next) => {
  const { offset, limit, name } = req.query;
  const regex = new RegExp(name, 'i') // i for case insensitive
  const filter: any = { $or:[{user_id: req.session.userId, name: { $regex: regex }}, {collaborators: { $elemMatch:{ _id: req.session.userId }}, name: { $regex: regex }}] };

  const [itineraries, count] = await Promise.all([
    Itinerary.find(filter, {}, { skip: Number(offset) || 0, limit: Number(limit) || 100, sort: {updatedAt: -1} }),
    Itinerary.countDocuments(filter),
  ]);

  res.status(200).send({
    itineraries: itineraries.map(e => e.toObject()),
    count,
  });
});

router.get('/:id', async (req: any, res, _next) => {
  const { id } = req.params;
  const itinerary = await Itinerary.findOne({ $or:[{ _id: id, user_id: req.session.userId }, { _id: id, collaborators: { $elemMatch:{ _id: req.session.userId }}}]}); // TODO update to use session user id too

  res.status(200).send(itinerary);
});

router.post('/', (req: any, res, _next) => {
  const itinerary = new Itinerary({ ...req.body, user_id: req.session.userId, collaborators: [...req.body.collaborators] });
  itinerary.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send("Invalid Itinerary")
    })
});

router.post('/new-activity', async (req: any, res, _next) => {
  const product = await Itinerary.findOne({ $or:[{ _id: req.body.itinerary_id, user_id: req.session.userId }, { _id: req.body.itinerary_id, collaborators: { $elemMatch:{ _id: req.session.userId }}}]});
  new Date(req.body.time);
  const activity = new Activity(req.body);
  product?.activities.push(activity);
  if (product && typeof product.current_cost !== 'undefined') { 
    product.current_cost += (activity.cost || 0);
  }
  product?.save()
    .then(() => {
      res.send(activity);
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).send("Invalid Activity")
    })
});

router.delete('/:id', (req: any, res, _next) => {
  Itinerary.findOneAndRemove({ _id: req.params.id, user_id: req.session.userId })
    .then(doc => {
      if (!doc) return res.status(500).send('Unable to delete itinerary');
      res.send(doc);
    }).catch(err => {
      console.error(err);
      res.status(404).send('Card with the given id does not exist');
    });
});

router.patch('/:id', async (req: any, res) => {
  const newCost = req.body.activities.reduce((cost: number, activity: any) => {
    return cost += (activity.cost || 0);
  }, 0)
  const product = await Itinerary.findOneAndUpdate({ $or:[{ _id: req.params.id, user_id: req.session.userId }, { _id: req.params.id, collaborators: { $elemMatch:{ _id: req.session.userId }}}]},
    { ...req.body, current_cost: newCost },
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

export default router;
