// Sidebar: contains search bar, accessibility toggle, building panel, and navigation panel
import SearchBar from './SearchBar'
import BuildingPanel from './BuildingPanel'
import NavigationPanel from './NavigationPanel'

export default function Sidebar({
  buildings,
  selectedBuilding,
  selectedClassroom,
  accessibilityMode,
  showTransit,
  onSelectBuilding,
  onToggleAccessibility,
  onToggleTransit,
  onShowFloor,
  onRouteChange,
  onClearBuilding,
}) {
  return (
    <aside className="sidebar">
      {/* App header */}
      <div className="sidebar-header">
        <div className="app-logo">
          <span className="logo-icon">🧭</span>
          <div>
            <div className="app-name">Campus Nav</div>
            <div className="app-sub">University of Calgary</div>
          </div>
        </div>
      </div>

      {/* Search (SCNA-05, SCNA-06) */}
      <div className="sidebar-section">
        <SearchBar
          buildings={buildings}
          onSelect={(building, classroom) => onSelectBuilding(building, classroom)}
        />
      </div>

      {/* Map toggle controls */}
      <div className="sidebar-section toggles-row">
        {/* Accessibility toggle (SCNA-13) */}
        <button
          className={`toggle-btn ${accessibilityMode ? 'active-green' : ''}`}
          onClick={onToggleAccessibility}
          title="Toggle accessibility routes"
        >
          ♿ {accessibilityMode ? 'Accessible ON' : 'Accessible'}
        </button>

        {/* Transit toggle (SCNA-16) */}
        <button
          className={`toggle-btn ${showTransit ? 'active-red' : ''}`}
          onClick={onToggleTransit}
          title="Show/hide transit stops"
        >
          🚌 {showTransit ? 'Transit ON' : 'Transit'}
        </button>
      </div>

      {/* Building info panel (SCNA-07) — shown when a building is selected */}
      {selectedBuilding && (
        <div className="sidebar-section">
          <BuildingPanel
            building={selectedBuilding}
            selectedClassroom={selectedClassroom}
            accessibilityMode={accessibilityMode}
            onShowFloor={onShowFloor}
            onClose={onClearBuilding}
          />
        </div>
      )}

      {/* Navigation panel (SCNA-08) */}
      <div className="sidebar-section">
        <NavigationPanel
          buildings={buildings}
          accessibilityMode={accessibilityMode}
          onRouteChange={onRouteChange}
        />
      </div>

      <div className="sidebar-footer">
        SENG 471 — Group 1 — Sprint 1 Prototype
      </div>
    </aside>
  )
}
