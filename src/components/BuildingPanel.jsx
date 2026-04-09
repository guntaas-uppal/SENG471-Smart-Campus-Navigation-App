// SCNA-07: Building info panel showing hours, floors, classrooms, description
// SCNA-14: Accessibility icons — elevator, ramp, accessible washroom
//          Green dot = available, Red dot = not available
//          Full accessible route text shown when accessibilityMode is active

export default function BuildingPanel({
  building,
  selectedClassroom,
  accessibilityMode,
  onShowFloor,
  onGetDirections,
  onClose,
}) {
  if (!building) return null

  const acc = building.accessibility

  return (
    <div className="panel building-panel">
      <div className="panel-header">
        <div className="panel-title-row">
          <span className="panel-code" style={{ background: building.color }}>{building.code}</span>
          <h2 className="panel-title">{building.name}</h2>
          <button className="panel-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="panel-badges-row">
          <span className="panel-type-badge">{building.type}</span>
          {/* open/closed badge placeholder — SCRUM-26 adds logic here */}
        </div>
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

        {/* Accessibility block */}
        <div className={`accessibility-block ${accessibilityMode ? 'active' : ''}`}>
          <span className="acc-label">Accessibility</span>
          <div className="acc-icons">
            <span className={`acc-icon ${acc.elevator ? 'yes' : 'no'}`}>
              {acc.elevator ? '🛗' : '🚫'} Elevator
            </span>
            <span className={`acc-icon ${acc.ramp ? 'yes' : 'no'}`}>
              {acc.ramp ? '♿' : '🚫'} Ramp
            </span>
            <span className={`acc-icon ${acc.accessibleWashroom ? 'yes' : 'no'}`}>
              {acc.accessibleWashroom ? '🚻' : '🚫'} Accessible WR
              {/* SCRUM-28 adds floor tag here */}
            </span>
          </div>
          {accessibilityMode && (
            <div className="acc-route-note">
              <strong>Accessible entrance:</strong> {acc.accessibleEntrance}<br />
              <strong>Accessible route:</strong> {acc.accessibleRoute}
            </div>
          )}
        </div>

        {/* Classrooms */}
        <div className="classrooms-section">
          <h3 className="section-label">Rooms &amp; Classrooms</h3>
          <ul className="classroom-list">
            {building.classrooms.map(c => (
              <li key={c.id}
                className={`classroom-item ${selectedClassroom?.id === c.id ? 'selected' : ''}`}>
                <span className="classroom-name">{c.name}</span>
                <span className="classroom-meta">{c.type} · Fl {c.floor} · Cap {c.capacity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel-actions">
          <button className="btn btn-secondary full-width" onClick={() => onShowFloor(building)}>
            View Floor Plan
          </button>
          {/* SCRUM-29 adds Get Directions To Here button here */}
        </div>
      </div>
    </div>
  )
}
