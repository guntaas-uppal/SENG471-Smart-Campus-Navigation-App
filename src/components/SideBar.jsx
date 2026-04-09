// Sidebar: contains search bar, accessibility toggle, building panel, and navigation panel

import SearchBar       from './SearchBar'
import BuildingPanel   from './BuildingPanel'
import NavigationPanel from './NavigationPanel'

export default function Sidebar({
  buildings,
  selectedBuilding,
  selectedClassroom,
  accessibilityMode,
  showTransit,
  prefillDestination,
  onSelectBuilding,
  onToggleAccessibility,
  onToggleTransit,
  onShowFloor,
  onGetDirections,
  onRouteChange,
  onClearBuilding,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="app-logo">
          <span className="logo-icon">🧭</span>
          <div>
            <div className="app-name">Campus Nav</div>
            <div className="app-sub">University of Calgary</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="sidebar-section">
        <SearchBar
          buildings={buildings}
          onSelect={(building, classroom) => onSelectBuilding(building, classroom)}
        />
      </div>

      {/* Map controls */}
      <div className="sidebar-section toggles-row">
        <button
          className={`toggle-btn ${accessibilityMode ? 'active-green' : ''}`}
          onClick={onToggleAccessibility}
          title="Toggle accessibility routes"
        >
          ♿ {accessibilityMode ? 'Accessible ON' : 'Accessible'}
        </button>
        <button
          className={`toggle-btn ${showTransit ? 'active-red' : ''}`}
          onClick={onToggleTransit}
          title="Show/hide transit stops"
        >
          🚌 {showTransit ? 'Transit ON' : 'Transit'}
        </button>
      </div>

      {/* SCRUM-19: BuildingPanel — shown only when a building is selected */}
      {selectedBuilding && (
        <div className="sidebar-section">
          <BuildingPanel
            building={selectedBuilding}
            selectedClassroom={selectedClassroom}
            accessibilityMode={accessibilityMode}
            onShowFloor={onShowFloor}
            onGetDirections={onGetDirections}
            onClose={onClearBuilding}
          />
        </div>
      )}

      {/* Navigation panel */}
      <div className="sidebar-section">
        <NavigationPanel
          buildings={buildings}
          accessibilityMode={accessibilityMode}
          onRouteChange={onRouteChange}
          prefillDestination={prefillDestination}
        />
      </div>

      <div className="sidebar-footer">
        SENG 471 — Group 1 — Sprint 2 Prototype
      </div>
    </aside>
  )
}
