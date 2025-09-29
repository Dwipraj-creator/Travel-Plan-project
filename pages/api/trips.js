import { getDb } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const db = await getDb()
  const col = db.collection('trips')

  try {
    if (req.method === 'GET') {
      const trips = await col.find({}).sort({ startDate: 1 }).toArray()
      return res.status(200).json(trips)
    }

    if (req.method === 'POST') {
      const { title, destination, startDate, endDate, notes } = req.body
      if (!title || !destination) return res.status(400).json({ error: 'title and destination required' })

      const doc = { title, destination, startDate: startDate || null, endDate: endDate || null, notes: notes || '', createdAt: new Date() }
      const result = await col.insertOne(doc)
      const created = await col.findOne({ _id: result.insertedId })
      return res.status(201).json(created)
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body
      if (!id) return res.status(400).json({ error: 'id required' })
      const _id = new ObjectId(id)
      await col.updateOne({ _id }, { $set: updates })
      const updated = await col.findOne({ _id })
      return res.status(200).json(updated)
    }

    if (req.method === 'DELETE') {
      const { id } = req.body
      if (!id) return res.status(400).json({ error: 'id required' })
      const _id = new ObjectId(id)
      await col.deleteOne({ _id })
      return res.status(200).json({ success: true })
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal error', details: err.message })
  }
}
