// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SCRUM-22: App.jsx Root Shell — Layout, Tabs, and State Management
//   - selectedBuilding, selectedClassroom, route, accessibilityMode,
//     showTransit, showFloor, activeFloor, sidebarOpen, prefillDest state
//   - Sidebar (left, fixed 360px) + CampusMap (right, fills remaining space)
//   - Floor plan modal overlay (FloorSelector + FloorPlan side by side)
//   - handleSelectBuilding, handleClearBuilding, handleShowFloor,
//     handleGetDirections callbacks passed down as props
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import buildings from './data/buildings'
import Sidebar        from './components/SideBar'
import CampusMap      from './components/CampusMap'
import FloorPlan      from './components/FloorPlan'
import FloorSelector  from './components/FloorSelector'
import './App.css'

export default function App() {
  const [selectedBuilding,  setSelectedBuilding]  = useState(null)
  const [selectedClassroom, setSelectedClassroom] = useState(null)
  const [route,             setRoute]             = useState([])
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [showTransit,       setShowTransit]       = useState(false)
  const [showFloor,         setShowFloor]         = useState(false)
  const [activeFloor,       setActiveFloor]       = useState(1)
  const [sidebarOpen,       setSidebarOpen]       = useState(true)
  const [prefillDest,       setPrefillDest]       = useState('')

  function handleSelectBuilding(building, classroom = null) {
    setSelectedBuilding(building)
    setSelectedClassroom(classroom)
    setShowFloor(false)
    setActiveFloor(1)
  }

  function handleClearBuilding() {
    setSelectedBuilding(null)
    setSelectedClassroom(null)
    setShowFloor(false)
  }

  function handleShowFloor(building) {
    setSelectedBuilding(building)
    setShowFloor(true)
    setActiveFloor(1)
  }

  // Pre-fills NavigationPanel destination — triggered from BuildingPanel
  function handleGetDirections(building) {
    setPrefillDest(building.id)
    const navPanel = document.querySelector('.nav-panel')
    if (navPanel) navPanel.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-root">
      {/* Mobile sidebar toggle button (SCRUM-30) */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* ── Sidebar ── */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : 'closed'}`}>
        <Sidebar
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          selectedClassroom={selectedClassroom}
          accessibilityMode={accessibilityMode}
          showTransit={showTransit}
          prefillDestination={prefillDest}
          onSelectBuilding={handleSelectBuilding}
          onToggleAccessibility={() => setAccessibilityMode(m => !m)}
          onToggleTransit={() => setShowTransit(t => !t)}
          onShowFloor={handleShowFloor}
          onGetDirections={handleGetDirections}
          onRouteChange={setRoute}
          onClearBuilding={handleClearBuilding}
        />
      </div>

      {/* ── Map area ── */}
      <main className="map-wrapper">
        {/* Accessibility banner — rendered by SCRUM-21 toggle */}
        {accessibilityMode && (
          <div className="accessibility-banner">
            ♿ Accessibility Mode Active — Showing accessible routes and building features
          </div>
        )}

        <CampusMap
          buildings={buildings}
          selectedBuilding={selectedBuilding}
          onSelectBuilding={handleSelectBuilding}
          route={route}
          accessibilityMode={accessibilityMode}
          showTransit={showTransit}
        />

        {/* ── Floor plan modal overlay (SCRUM-11/12) ── */}
        {showFloor && selectedBuilding && (
          <div
            className="floor-modal-overlay"
            onClick={e => { if (e.target === e.currentTarget) setShowFloor(false) }}
          >
            <FloorSelector
              building={selectedBuilding}
              onFloorSelect={setActiveFloor}
              onClose={() => setShowFloor(false)}
            />
            <FloorPlan
              building={selectedBuilding}
              selectedFloor={activeFloor}
              onClose={() => setShowFloor(false)}
            />
          </div>
        )}
      </main>
    </div>
  )
}
