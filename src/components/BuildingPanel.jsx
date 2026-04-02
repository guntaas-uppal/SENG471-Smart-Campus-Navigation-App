// SCNA-07, SCNA-14: Building info panel showing hours, floors, classrooms,
// and accessibility details when a building is selected on the map.
export default function BuildingPanel({ building, selectedClassroom, accessibilityMode, onShowFloor, onClose }) {
  if (!building) return null

  const acc = building.accessibility

  return (
    <div className="panel building-panel">
      <div className="panel-header">
        <div className="panel-title-row">
          <span className="panel-code" style={{ background: building.color }}>{building.code}</span>
          <h2 className="panel-title">{building.name}</h2>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>
        <span className="panel-type-badge">{building.type}</span>
      </div>

      <div className="panel-body">
        <p className="panel-description">{building.description}</p>

        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Floors</span>
            <span className="info-value">{building.floors}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Hours</span>
            <span className="info-value hours">{building.hours}</span>
          </div>
        </div>

        {/* Accessibility info (SCNA-14) */}
        <div className={`accessibility-block ${accessibilityMode ? 'active' : ''}`}>
          <div className="acc-row">
            <span className="acc-label">Accessibility</span>
          </div>
          <div className="acc-icons">
            <span className={`acc-icon ${acc.elevator ? 'yes' : 'no'}`}>
              {acc.elevator ? '🛗' : '🚫'} Elevator
            </span>
            <span className={`acc-icon ${acc.ramp ? 'yes' : 'no'}`}>
              {acc.ramp ? '♿' : '🚫'} Ramp
            </span>
            <span className={`acc-icon ${acc.accessibleWashroom ? 'yes' : 'no'}`}>
              {acc.accessibleWashroom ? '🚻' : '🚫'} Accessible WR
            </span>
          </div>
          {accessibilityMode && (
            <div className="acc-route-note">
              <strong>Accessible entrance:</strong> {acc.accessibleEntrance}<br />
              <strong>Accessible route:</strong> {acc.accessibleRoute}
            </div>
          )}
        </div>

        {/* Classrooms list */}
        <div className="classrooms-section">
          <h3 className="section-label">Rooms & Classrooms</h3>
          <ul className="classroom-list">
            {building.classrooms.map(c => (
              <li key={c.id} className={`classroom-item ${selectedClassroom?.id === c.id ? 'selected' : ''}`}>
                <span className="classroom-name">{c.name}</span>
                <span className="classroom-meta">{c.type} · Fl {c.floor} · Cap {c.capacity}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn btn-primary full-width" onClick={() => onShowFloor(building)}>
          View Floor Plan
        </button>
      </div>
    </div>
  )
}
