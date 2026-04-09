// SCNA-05, SCNA-06: Search bar with real-time filtered results dropdown
// SCRUM-24: Add Classroom Search — Search Rooms, Labs, and Offices

import { useState, useRef, useEffect } from 'react'

export default function SearchBar({ buildings, onSelect }) {
  const [query, setQuery] = useState('')
  const [open,  setOpen]  = useState(false)
  const ref = useRef(null)

  const results = query.trim().length === 0 ? [] : (() => {
    const q = query.toLowerCase()
    const matches = []
    buildings.forEach(b => {
      if (b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q)) {
        matches.push({ type: 'building', building: b, label: `${b.code} — ${b.name}`, sub: b.type })
      }
      b.classrooms.forEach(c => {
        if (c.name.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)) {
          matches.push({
            type: 'classroom', building: b, classroom: c,
            label: c.name, sub: `${c.type} · Floor ${c.floor} · ${b.code}`,
          })
        }
      })
    })
    return matches.slice(0, 8)
  })()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(result) {
    onSelect(result.building, result.classroom || null)
    setQuery(result.label)
    setOpen(false)
  }

  return (
    <div className="search-wrapper" ref={ref}>
      <div className="search-input-row">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search buildings, classrooms, labs..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); setOpen(false) }} aria-label="Clear">✕</button>
        )}
      </div>
      {open && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((r, i) => (
            <li key={i} className="search-result" onMouseDown={() => handleSelect(r)}>
              <span className={`result-badge ${r.type}`}>{r.type === 'building' ? 'BLDG' : 'ROOM'}</span>
              <span className="result-label">{r.label}</span>
              <span className="result-sub">{r.sub}</span>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="search-empty">No results for "{query}"</div>
      )}
    </div>
  )
}
