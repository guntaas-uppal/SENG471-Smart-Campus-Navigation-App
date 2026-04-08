// SCNA-11, SCNA-12: Indoor floor plan viewer with floor selector.
// Renders a static SVG layout per floor using the building's floorPlan data.
import { useState } from 'react'

// Color map for room types
const ROOM_COLORS = {
  lecture:   { fill: '#bfdbfe', stroke: '#3b82f6', label: '#1d4ed8' },
  seminar:   { fill: '#ddd6fe', stroke: '#7c3aed', label: '#5b21b6' },
  lab:       { fill: '#d1fae5', stroke: '#059669', label: '#065f46' },
  washroom:  { fill: '#fed7aa', stroke: '#ea580c', label: '#9a3412' },
  elevator:  { fill: '#a7f3d0', stroke: '#10b981', label: '#065f46' },
  common:    { fill: '#e0f2fe', stroke: '#0284c7', label: '#0369a1' },
  office:    { fill: '#fef9c3', stroke: '#ca8a04', label: '#854d0e' },
}

export default function FloorPlan({ building, onClose }) {
  const [floor, setFloor] = useState(1)

  if (!building) return null

  const rooms = building.floorPlan[floor] || []

  return (
    <div className="floorplan-overlay">
      <div className="floorplan-modal">
        <div className="floorplan-header">
          <div>
            <h2 className="floorplan-title">{building.name}</h2>
            <span className="floorplan-subtitle">Indoor Floor Plan — {building.code}</span>
          </div>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Floor selector (SCNA-12) */}
        <div className="floor-selector">
          {Array.from({ length: building.floors }, (_, i) => i + 1).map(f => (
            <button
              key={f}
              className={`floor-btn ${floor === f ? 'active' : ''}`}
              onClick={() => setFloor(f)}
            >
              Floor {f}
            </button>
          ))}
        </div>

        {/* SVG floor plan */}
        <div className="floorplan-svg-wrapper">
          <svg
            viewBox="0 0 530 200"
            width="100%"
            style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc' }}
          >
            {/* Floor outline */}
            <rect x="10" y="10" width="510" height="180" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="6" />

            {rooms.map((room, i) => {
              const c = ROOM_COLORS[room.type] || ROOM_COLORS.common
              return (
                <g key={i}>
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill={c.fill}
                    stroke={c.stroke}
                    strokeWidth="1.5"
                    rx="3"
                  />
                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill={c.label}
                    fontWeight="600"
                    fontFamily="DM Sans, sans-serif"
                  >
                    {room.label}
                  </text>
                </g>
              )
            })}

            {/* Floor label */}
            <text x="20" y="190" fontSize="8" fill="#94a3b8" fontFamily="DM Sans">
              Floor {floor} — {building.code} — Mock Layout (Sprint 1 Prototype)
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="floorplan-legend">
          {Object.entries(ROOM_COLORS).map(([type, c]) => (
            <span key={type} className="legend-item">
              <span className="legend-dot" style={{ background: c.fill, border: `1.5px solid ${c.stroke}` }} />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>

        <p className="floorplan-note">
          Note: This is a simplified mockup layout for the Sprint 1 prototype. Room positions are illustrative only.
        </p>
      </div>
    </div>
  )
}
