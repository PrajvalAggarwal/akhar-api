
import * as dotenv from "dotenv";

dotenv.config();

export interface IConfig {
  PORT: number;
  MONGOOSE: {
    url: string;
  };
  EMAIL: {
    smtp: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
}

const config: IConfig = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGOOSE: {
    url: process.env.MONGODB_URL || '',
  },
  EMAIL: {
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 0,
      auth: {
        user: process.env.SMTP_USERNAME || '',
        pass: process.env.SMTP_PASSWORD || '',
      },
    },
  },
};

export default config;
