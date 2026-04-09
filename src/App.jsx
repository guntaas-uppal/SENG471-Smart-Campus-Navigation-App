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
// SCRUM-30: Add Mobile Responsive Sidebar Collapse Toggle


import { useState } from 'react'
import buildings from './data/buildings'
import Sidebar       from './components/SideBar'
import CampusMap     from './components/CampusMap'
import FloorPlan     from './components/FloorPlan'
import FloorSelector from './components/FloorSelector'
import './App.css'

export default function App() {
  const [selectedBuilding,  setSelectedBuilding]  = useState(null)
  const [selectedClassroom, setSelectedClassroom] = useState(null)
  const [route,             setRoute]             = useState([])
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [showTransit,       setShowTransit]       = useState(false)
  const [showFloor,         setShowFloor]         = useState(false)
  const [activeFloor,       setActiveFloor]       = useState(1)
  // SCRUM-30: controls sidebar open/closed on mobile
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

  function handleGetDirections(building) {
    setPrefillDest(building.id)
    // SCRUM-30: on mobile, scroll nav panel into view after pre-filling
    const navPanel = document.querySelector('.nav-panel')
    if (navPanel) navPanel.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-root">

      {/* SCRUM-30: hamburger button — hidden on desktop, visible on mobile (<768px)
          CSS in App.css: .mobile-sidebar-toggle { display: none }
          @media (max-width:768px): display: flex                              */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* SCRUM-30: sidebar-wrapper gets 'closed' class when sidebarOpen=false
          CSS: .sidebar-wrapper.closed → display:none on mobile               */}
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

      <main className="map-wrapper">
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
