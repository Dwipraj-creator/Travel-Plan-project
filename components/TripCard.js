import { useState } from 'react'
import TripForm from './TripForm'

export default function TripCard({ trip, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      {!editing ? (
        <>
          <h3>{trip.title}</h3>
          <div><strong>Destination:</strong> {trip.destination}</div>
          <div><strong>Start:</strong> {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : '—'}</div>
          <div><strong>End:</strong> {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : '—'}</div>
          <p>{trip.notes}</p>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(trip._id)} style={{ marginLeft: 8 }}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <TripForm
            initial={trip}
            onSubmit={async (payload) => {
              await onUpdate(trip._id, payload)
              setEditing(false)
            }}
            submitLabel="Update"
          />
          <button onClick={() => setEditing(false)} style={{ marginTop: 8 }}>Cancel</button>
        </>
      )}
    </div>
  )
}
