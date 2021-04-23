import { Db, MongoClient } from 'mongodb';

interface ConnectProps {
  db: Db;
  client: MongoClient;
}

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(): Promise<ConnectProps> {
  if (!client.isConnected()) await client.connect();

  const db = client.db('teach-other');
  return { db, client };
}
