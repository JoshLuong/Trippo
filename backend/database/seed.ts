import 'dotenv/config';
import mongoose from 'mongoose';
import { Activity, Day } from './models';
import { days } from './mocks';

const seed = async () => {
  console.log('Seeding started...');
  await mongoose.connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  for (const day of days) {
    const activities = await Activity.insertMany(day.map(activity => {
      return new Activity(activity);
    }));

    await Day.create({ activities: activities.map(act => act.id!)});
  }

  await mongoose.connection.close();
}

seed()
  .then(() => console.log('Finished.'))
  .catch(err => console.log(err));
