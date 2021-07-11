import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb+srv://bilal:bilal123@devcluster.vtac9.mongodb.net/Developer?retryWrites=true&w=majority'),
    },
  ];