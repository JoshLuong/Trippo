import 'dotenv/config';
import mongoose from 'mongoose';
import { Activity, User, Itinerary } from './models';
import { activities, users, itineraries } from './mocks';

const seed = async () => {
  console.log('Seeding started...');
  let userIds: any = [];
  await mongoose.connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // todo remove
  /*
  await Activity.insertMany(activities.map(activity => {
    return new Activity(activity);
  }));
  */

  await User.insertMany(users.map(user => {
    const u = new User(user);
    // push users with new IDs
    userIds.push(u);
    return u;
  }));

  await Itinerary.insertMany(itineraries.map(itin => {
    const itinWithUsers = {...itin, user_id: userIds[0]._id, collaborators: [{user_id: userIds[1]._id, name:  userIds[1].name, password: userIds[1].password }]};
    return new Itinerary(itinWithUsers);
  }));

  await mongoose.connection.close();
}

seed()
  .then(() => console.log('Finished.'))
  .catch(err => console.log(err));
