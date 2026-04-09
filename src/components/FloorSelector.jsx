// src/components/FloorSelector.jsx
// SCRUM-12: Floor Selector Component for Indoor Navigation View
// Shows clickable floor buttons; indicates which floors have room data.

import { useState } from 'react';

export default function FloorSelector({ building, onFloorSelect, onClose }) {
  const [active, setActive] = useState(1);

  if (!building) return null;

  // Floors that have at least one classroom entry
  const mappedFloors = new Set(building.classrooms.map(c => c.floor));

  function handleSelect(f) {
    setActive(f);
    onFloorSelect(f);
  }

  return (
    <div className="floor-selector">
      <div className="floor-selector-header">
        <span className="panel-code" style={{ background: building.color }}>{building.code}</span>
        <span className="floor-selector-title">Select Floor</span>
        <button className="panel-close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="floor-selector-grid">
        {Array.from({ length: building.floors }, (_, i) => i + 1).map(f => (
          <button
            key={f}
            className={`floor-btn ${active === f ? 'active' : ''} ${mappedFloors.has(f) ? 'has-data' : 'no-data'}`}
            onClick={() => handleSelect(f)}
            title={
              mappedFloors.has(f)
                ? `Floor ${f} — room data available`
                : `Floor ${f} — no room data yet`
            }
          >
            <span className="floor-num">F{f}</span>
            {mappedFloors.has(f) && <span className="floor-dot">●</span>}
            {/* Accessible washroom badge */}
            {building.accessibility.accessibleWashroomFloor === f && (
              <span className="floor-acc" title="Accessible washroom on this floor">♿</span>
            )}
          </button>
        ))}
      </div>

      <div className="floor-selector-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#16a34a' }} />
          Has room data
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#94a3b8' }} />
          No data yet
        </span>
        {building.accessibility.accessibleWashroom && (
          <span className="legend-item">
            <span>♿</span> Accessible WR floor
          </span>
        )}
      </div>

      {!building.accessibility.elevator && (
        <div className="floor-selector-note no-elevator">
          ⚠️ No elevator — stair access only to upper floors
        </div>
      )}
    </div>
  );
}
