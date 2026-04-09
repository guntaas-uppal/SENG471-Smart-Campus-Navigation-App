// SCNA-02, SCNA-03, SCNA-09, SCNA-16: Mock SVG campus map with building markers,
// route polyline, and transit stop markers. No real map API used.
// SCRUM-21: Implement Accessibility Mode Toggle with Route Highlighting

import { transitStops } from '../data/buildings'

const MAP_W = 620
const MAP_H = 430

export default function CampusMap({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  route,
  accessibilityMode,   // ← SCRUM-21: drives dot colours and polyline colour
  showTransit,
}) {
  function pointsString(waypoints) {
    return waypoints.map(p => `${p.x},${p.y}`).join(' ')
  }

  return (
    <div className="map-container">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        width="100%" height="100%"
        className="campus-svg"
      >
        {/* Background */}
        <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="#e8f0e4" rx="8" />
        <rect x="60" y="140" width="500" height="180" fill="#d1e8c8" rx="4" opacity="0.5" />
        <rect x="200" y="240" width="220" height="30"  fill="#c5dbb9" rx="2" opacity="0.7" />
        <rect x="60"  y="230" width="500" height="10"  fill="#c8d8c0" rx="2" />
        <rect x="305" y="140" width="10"  height="230" fill="#c8d8c0" rx="2" />
        <rect x="30" y="100" width="560" height="300"
          fill="none" stroke="#b0c4a8" strokeWidth="2" rx="10" strokeDasharray="6 4" />

        {/* SCRUM-21: route polyline — green dashed when accessibilityMode on */}
        {route && route.length > 1 && (
          <polyline
            points={pointsString(route)}
            fill="none"
            stroke={accessibilityMode ? '#16a34a' : '#2563eb'}
            strokeWidth="3.5"
            strokeDasharray={accessibilityMode ? '8 5' : '6 4'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {/* SCRUM-21: endpoint dots — green in accessibility mode */}
        {route && route.length > 1 && (
          <>
            <circle cx={route[0].x} cy={route[0].y} r="7"
              fill="#2563eb" stroke="#fff" strokeWidth="2" />
            <circle cx={route[route.length - 1].x} cy={route[route.length - 1].y} r="7"
              fill={accessibilityMode ? '#16a34a' : '#2563eb'}
              stroke="#fff" strokeWidth="2" />
          </>
        )}

        {/* Building markers */}
        {buildings.map(b => {
          const isSelected     = selectedBuilding?.id === b.id
          const acc            = b.accessibility
          // SCRUM-21: compute accessibility status
          const fullyAccessible = acc.elevator && acc.ramp
          const hasAccessIssue  = accessibilityMode && !fullyAccessible

          return (
            <g key={b.id} style={{ cursor: 'pointer' }} onClick={() => onSelectBuilding(b)}>
              <rect
                x={b.mapX} y={b.mapY} width={b.width} height={b.height}
                fill={isSelected ? b.color : b.color + 'cc'}
                stroke={isSelected ? '#1e293b' : b.color}
                strokeWidth={isSelected ? 3 : 1.5}
                rx="4"
                filter={isSelected
                  ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                  : 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))'}
              />

              {/* SCRUM-21: amber dot = accessibility gap */}
              {accessibilityMode && hasAccessIssue && (
                <circle
                  cx={b.mapX + b.width - 8} cy={b.mapY + 8}
                  r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5"
                  title="Limited accessibility"
                />
              )}
              {/* SCRUM-21: green dot = fully accessible */}
              {accessibilityMode && !hasAccessIssue && (
                <circle
                  cx={b.mapX + b.width - 8} cy={b.mapY + 8}
                  r="6" fill="#16a34a" stroke="#fff" strokeWidth="1.5"
                  title="Fully accessible"
                />
              )}

              <text x={b.mapX + b.width / 2} y={b.mapY + b.height / 2 - 5}
                textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Arial">
                {b.code}
              </text>
              <text x={b.mapX + b.width / 2} y={b.mapY + b.height / 2 + 10}
                textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial" opacity="0.9">
                {b.floors}F
              </text>
            </g>
          )
        })}

        {/* Transit stops */}
        {showTransit && transitStops.map(ts => (
          <g key={ts.id}>
            <circle cx={ts.mapX} cy={ts.mapY} r="12" fill="#dc2626" stroke="#fff" strokeWidth="2" opacity="0.92" />
            <text x={ts.mapX} y={ts.mapY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">T</text>
            <rect x={ts.mapX + 14} y={ts.mapY - 8} width="110" height="16" fill="white" opacity="0.85" rx="3" />
            <text x={ts.mapX + 18} y={ts.mapY + 4} fill="#1e293b" fontSize="8" fontFamily="Arial">
              {ts.name.split('(')[0].trim()}
            </text>
          </g>
        ))}
        {showTransit && (
          <g>
            <circle cx="50" cy="30" r="8" fill="#dc2626" stroke="#fff" strokeWidth="1.5" />
            <text x="50" y="33" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">T</text>
            <text x="64" y="34" fill="#1e293b" fontSize="9" fontFamily="Arial">= Transit Stop</text>
          </g>
        )}

        <text x="575" y="420" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="700" fontFamily="Arial">N↑</text>
        <text x="40"  y="420" fontSize="8" fill="#64748b" fontFamily="Arial">University of Calgary — Mock Campus Map</text>
      </svg>
    </div>
  )
}
