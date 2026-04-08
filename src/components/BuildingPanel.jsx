// SCNA-07: Building info panel showing hours, floors, classrooms, description
// SCNA-14: Accessibility icons — elevator, ramp, accessible washroom
//          Green dot = available, Red dot = not available
//          Full accessible route text shown when accessibilityMode is active

export default function BuildingPanel({
  building,
  selectedClassroom,
  accessibilityMode,
  onShowFloor,
  onClose,
}) {
  if (!building) return null

  const acc = building.accessibility

  return (
    <div className="panel building-panel">
      <div className="panel-header">
        <div className="panel-title-row">
          <span className="panel-code" style={{ background: building.color }}>
            {building.code}
          </span>
          <h2 className="panel-title">{building.name}</h2>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>
        <span className="panel-type-badge">{building.type}</span>
      </div>

      <div className="panel-body">
        <p className="panel-description">{building.description}</p>

        {/* Building hours and floor count */}
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

        {/* SCNA-14: Accessibility block */}
        <div className={`accessibility-block ${accessibilityMode ? 'active' : ''}`}>
          <div className="acc-row">
            <span className="acc-label">Accessibility</span>
          </div>

          {/* Icons: green pill = available, red pill = not available */}
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

          {/* Extended accessible route info — only shown in accessibility mode */}
          {accessibilityMode && (
            <div className="acc-route-note">
              <strong>Accessible entrance:</strong> {acc.accessibleEntrance}
              <br />
              <strong>Accessible route:</strong> {acc.accessibleRoute}
            </div>
          )}
        </div>

        {/* Classrooms list */}
        <div className="classrooms-section">
          <h3 className="section-label">Rooms &amp; Classrooms</h3>
          <ul className="classroom-list">
            {building.classrooms.map(c => (
              <li
                key={c.id}
                className={`classroom-item ${
                  selectedClassroom?.id === c.id ? 'selected' : ''
                }`}
              >
                <span className="classroom-name">{c.name}</span>
                <span className="classroom-meta">
                  {c.type} · Fl {c.floor} · Cap {c.capacity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opens FloorPlan modal (SCNA-11) */}
        <button
          className="btn btn-primary full-width"
          onClick={() => onShowFloor(building)}
        >
          View Floor Plan
        </button>
      </div>
    </div>
  )
}
