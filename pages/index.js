import useSWR from 'swr'
import TripCard from '../components/TripCard'
import TripForm from '../components/TripForm'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home() {
  const { data: trips, mutate } = useSWR('/api/trips', fetcher)

  async function addTrip(payload) {
    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) mutate()
  }

  async function deleteTrip(id) {
    const res = await fetch('/api/trips', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    if (res.ok) mutate()
  }

  async function updateTrip(id, updates) {
    const res = await fetch('/api/trips', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates })
    })
    if (res.ok) mutate()
  }

  return (
    <main style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Travel Planner</h1>
      <section style={{ marginBottom: 20 }}>
        <h2>Add trip</h2>
        <TripForm onSubmit={addTrip} />
      </section>

      <section>
        <h2>Trips</h2>
        {!trips && <div>Loading...</div>}
        {trips && trips.length === 0 && <div>No trips yet.</div>}
        <div style={{ display: 'grid', gap: 12 }}>
          {trips && trips.map(trip => (
            <TripCard key={trip._id} trip={trip} onDelete={deleteTrip} onUpdate={updateTrip} />
          ))}
        </div>
      </section>
    </main>
  )
}
