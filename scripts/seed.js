import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

async function run(){
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || 'travel-planner')
  const col = db.collection('trips')
  await col.insertMany([
    { title: 'Weekend in Goa', destination: 'Goa, India', startDate: '2025-10-10', endDate: '2025-10-12', notes: 'Beach time', createdAt: new Date() },
    { title: 'Himalaya Trek', destination: 'Manali', startDate: '2026-02-01', endDate: '2026-02-10', notes: 'Trekking', createdAt: new Date() }
  ])
  console.log('seeded')
  await client.close()
}
run().catch(console.error)
