// SCNA-08: Step-by-step navigation mock panel
// SCNA-09: Triggers route polyline on map via onRouteChange prop
// User selects origin + destination; app draws route and shows directions list.
// SCRUM-27: Add Step-by-Step Navigation for All Building Pairs

import { useState, useEffect } from 'react'
import { mockRoutes } from '../data/buildings'

export default function NavigationPanel({
  buildings,
  accessibilityMode,
  onRouteChange,
  prefillDestination,
}) {
  const [origin,      setOrigin]      = useState('')
  const [destination, setDestination] = useState('')
  const [steps,       setSteps]       = useState([])
  const [noRoute,     setNoRoute]     = useState(false)

  // SCRUM-29: auto-fill destination when triggered from BuildingPanel
  useEffect(() => {
    if (prefillDestination) setDestination(prefillDestination)
  }, [prefillDestination])

  function handleNavigate() {
    if (!origin || !destination || origin === destination) return

    const key1 = `${origin}-${destination}`
    const key2 = `${destination}-${origin}`
    const routeData = mockRoutes[key1] || mockRoutes[key2]

    if (routeData) {
      const waypoints = accessibilityMode ? routeData.accessible : routeData.standard
      const dirSteps  = accessibilityMode ? routeData.steps.accessible : routeData.steps.standard
      setSteps(dirSteps)
      setNoRoute(false)
      onRouteChange(waypoints)
    } else {
      // Generic fallback for pairs without a pre-mapped route
      const o = buildings.find(b => b.id === origin)
      const d = buildings.find(b => b.id === destination)
      const genericSteps = accessibilityMode
        ? [
            `Exit ${o.name} via the accessible entrance.`,
            'Follow the accessible campus path toward your destination.',
            `Arrive at ${d.name} via the accessible entrance.`,
            'Estimated time: varies. Check accessible entrance signs on campus.',
          ]
        : [
            `Exit ${o.name} main entrance.`,
            'Follow campus walkway toward your destination.',
            `Arrive at ${d.name}.`,
            'Estimated time: 5–10 minutes walking.',
          ]
      setSteps(genericSteps)
      setNoRoute(true)
      onRouteChange([])
    }
  }

  function handleClear() {
    setOrigin('')
    setDestination('')
    setSteps([])
    setNoRoute(false)
    onRouteChange([])
  }

  return (
    <div className="panel nav-panel">
      <h3 className="panel-section-title">Get Directions</h3>

      <div className="nav-selects">
        <div className="select-group">
          <label className="select-label">From</label>
          <select className="nav-select" value={origin} onChange={e => setOrigin(e.target.value)}>
            <option value="">Select starting building...</option>
            {buildings.map(b => (
              <option key={b.id} value={b.id}>{b.code} — {b.name}</option>
            ))}
          </select>
        </div>
        <div className="select-group">
          <label className="select-label">To</label>
          <select className="nav-select" value={destination} onChange={e => setDestination(e.target.value)}>
            <option value="">Select destination...</option>
            {buildings.map(b => (
              <option key={b.id} value={b.id}>{b.code} — {b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {accessibilityMode && (
        <div className="acc-nav-note">
          ♿ Accessibility mode on — accessible routes will be shown
        </div>
      )}

      <div className="nav-buttons">
        <button
          className="btn btn-primary"
          onClick={handleNavigate}
          disabled={!origin || !destination || origin === destination}
        >
          Get Directions
        </button>
        {steps.length > 0 && (
          <button className="btn btn-ghost" onClick={handleClear}>Clear</button>
        )}
      </div>

      {noRoute && steps.length > 0 && (
        <div className="route-warning">
          No pre-mapped route for this pair. Showing generic directions.
        </div>
      )}

      {steps.length > 0 && (
        <div className="steps-container">
          <h4 className="steps-title">
            {accessibilityMode ? '♿ Accessible Route' : '🚶 Walking Directions'}
          </h4>
          <ol className="steps-list">
            {steps.map((step, i) => (
              <li key={i} className="step-item">
                <span className="step-num">{i + 1}</span>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
