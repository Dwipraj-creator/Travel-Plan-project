import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'travel-planner'

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global._mongoClientPromise

if (!cached) {
  const client = new MongoClient(uri)
  cached = client.connect()
  global._mongoClientPromise = cached
}

export async function getDb() {
  const client = await cached
  return client.db(dbName)
}
