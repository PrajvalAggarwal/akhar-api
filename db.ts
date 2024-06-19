
// mongooseConnection.ts

import mongoose, { ConnectOptions } from 'mongoose';
import defaultconfig,{IConfig}  from './config/config';


export const connectToDatabase = async (config: IConfig = defaultconfig): Promise<void> => {
  try {
    await mongoose.connect(config.MONGOOSE.url);

    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};