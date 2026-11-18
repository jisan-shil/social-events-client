import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';

const globalForMongo = globalThis;
const client = globalForMongo._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== 'production') globalForMongo._mongoClient = client;

const db = client.db('socialEvents');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: '1h',
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      },
    }),
    nextCookies(),
  ],
});