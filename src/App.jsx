import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import BuildingDetail from "./components/BuildingDetail";
import {
  EventsTab,
  ParkingTab,
  AccessibilityTab,
  ChatBot,
  NotificationPanel,
} from "./components/index.jsx";
import { BUILDINGS, EVENTS, PARKING, TRANSIT } from "./data/campusData";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("map");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.0783, -114.1323]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setUserLocation([51.0783, -114.1323])
      );
    }
  }, []);

  const notifications = [
    { id: 1, text: "⚠️ Construction: ICT side entrance closed until April 15", type: "alert" },
    { id: 2, text: "📢 Engineering Career Fair — ENG Atrium, 1:00 PM today", type: "event" },
  ];

  const handleSelectBuilding = (building) => {
    setSelectedBuilding(building);
    setMapCenter([building.lat, building.lng]);
    setTab("map");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-sub">UCalgary</span>
          <span className="brand-title">Campus Navigator</span>
        </div>
        <div className="header-actions">
          <button
            className={`icon-btn ${accessibilityMode ? "on" : ""}`}
            onClick={() => setAccessibilityMode((a) => !a)}
            aria-label="Toggle accessibility mode"
          >
            ♿ {accessibilityMode ? "ON" : "OFF"}
          </button>
          <div style={{ position: "relative" }}>
            <button
              className="icon-btn notif-btn"
              onClick={() => setNotifOpen((n) => !n)}
              aria-label="Notifications"
            >
              🔔
            </button>
            <span className="notif-dot pulse" />
          </div>
        </div>
      </header>

      {notifOpen && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setNotifOpen(false)}
        />
      )}

      <div className="search-wrapper">
        <SearchBar buildings={BUILDINGS} onSelect={handleSelectBuilding} />
      </div>

      {accessibilityMode && (
        <div className="access-banner">
          <span className="access-badge">♿ ACTIVE</span>
          Showing accessible routes, elevators &amp; ramps
        </div>
      )}

      <main className="main-content">
        {tab === "map" && (
          <>
            <MapView
              buildings={BUILDINGS}
              selectedBuilding={selectedBuilding}
              onSelectBuilding={setSelectedBuilding}
              accessibilityMode={accessibilityMode}
              userLocation={userLocation}
              mapCenter={mapCenter}
            />
            {selectedBuilding && (
              <BuildingDetail
                building={selectedBuilding}
                accessibilityMode={accessibilityMode}
                onClose={() => setSelectedBuilding(null)}
              />
            )}
          </>
        )}
        {tab === "events" && <EventsTab events={EVENTS} />}
        {tab === "parking" && <ParkingTab parking={PARKING} transit={TRANSIT} />}
        {tab === "access" && (
          <AccessibilityTab
            buildings={BUILDINGS}
            accessibilityMode={accessibilityMode}
            onToggle={() => setAccessibilityMode((a) => !a)}
          />
        )}
      </main>

      <nav className="bottom-nav">
        {[
          { id: "map", icon: "🗺️", label: "Map" },
          { id: "events", icon: "📅", label: "Events" },
          { id: "parking", icon: "🅿️", label: "Parking" },
          { id: "access", icon: "♿", label: "Access" },
        ].map((t) => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span className="nav-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
        <button className="nav-btn" onClick={() => setChatOpen(true)}>
          <span className="nav-icon">💬</span>
          Chat
        </button>
      </nav>

      {chatOpen && (
        <ChatBot onClose={() => setChatOpen(false)} buildings={BUILDINGS} />
      )}
    </div>
  );
}