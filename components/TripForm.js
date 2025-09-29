import { useState } from 'react'

export default function TripForm({ initial = {}, onSubmit, submitLabel = 'Save' }) {
  const [title, setTitle] = useState(initial.title || '')
  const [destination, setDestination] = useState(initial.destination || '')
  const [startDate, setStartDate] = useState(initial.startDate ? initial.startDate.split('T')[0] : '')
  const [endDate, setEndDate] = useState(initial.endDate ? initial.endDate.split('T')[0] : '')
  const [notes, setNotes] = useState(initial.notes || '')

  async function handle(e) {
    e.preventDefault()
    if (!title || !destination) return alert('title and destination required')
    await onSubmit({ title, destination, startDate, endDate, notes })
    setTitle('')
    setDestination('')
    setStartDate('')
    setEndDate('')
    setNotes('')
  }

  return (
    <form onSubmit={handle} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Trip title" />
      <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
      <label>Start date <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
      <label>End date <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" />
      <button type="submit">{submitLabel}</button>
    </form>
  )
}
