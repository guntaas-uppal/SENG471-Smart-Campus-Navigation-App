# 🗺️ UCalgary Smart Campus Navigation App

**SENG 471 — Software Requirements Engineering | Group 1 | Assignment 4**

A mobile-first React web application for navigating the University of Calgary campus. Features a real-world interactive map (OpenStreetMap via Leaflet), building search, floor guides, accessibility routing, campus events, parking availability, transit information, and a campus bot.

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18.0.0 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | v9.0.0 or higher (comes with Node) | — |
| **Git** | Any recent version | [git-scm.com](https://git-scm.com) |

To check your versions:
```bash
node --version   # should be v18+
npm --version    # should be v9+
git --version
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/smart-campus-nav.git
cd smart-campus-nav
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- **React 18** — UI framework
- **Vite** — fast build tool and dev server
- **Leaflet 1.9.4** — interactive map library (loaded via CDN in `index.html`)

### 3. Run the development server
```bash
npm run dev
```

The app will open at: **http://localhost:5173**

---

## 🏗️ Project Structure

```
smart-campus-nav/
├── index.html                  # Entry HTML — loads Leaflet via CDN
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite build configuration
├── README.md                   # This file
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component — layout, tabs, state
    ├── App.css                 # Global styles and design tokens
    ├── data/
    │   └── campusData.js       # Building data (real UCalgary coords), events, parking, transit
    └── components/
        ├── MapView.jsx         # Leaflet real-world map with building markers
        ├── SearchBar.jsx       # Live search for buildings, rooms, departments
        ├── BuildingDetail.jsx  # Selected building info, floors, amenities
        └── index.jsx           # EventsTab, ParkingTab, AccessibilityTab, ChatBot, NotificationPanel
```

---

## 🗺️ Map Technology

This app uses **Leaflet.js** with **OpenStreetMap** tiles for a real-world accurate map:

- Building markers are placed at real GPS coordinates (WGS84)
- The map shows the actual University of Calgary campus layout
- Users can zoom, pan, and tap markers to explore buildings
- Accessibility mode overlays wheelchair-accessible route paths
- On supported browsers, the user's real GPS location is shown

> **Internet required** for map tiles. Offline map tile caching is a planned feature (see Jira backlog).

---

## ✨ Features

| Feature | Status | Requirement |
|---------|--------|-------------|
| Real-world interactive campus map | ✅ Done | FR-3 |
| Building search (name, code, dept) | ✅ Done | FR-1, FR-2 |
| Floor guide with room types | ✅ Done | FR-6 |
| Building hours & busyness | ✅ Done | FR-7, FR-15 |
| Accessibility mode (elevators, ramps) | ✅ Done | FR-12, FR-13 |
| Campus events & announcements | ✅ Done | FR-10 |
| Parking availability | ✅ Done | FR-11 |
| Transit nearby (bus/CTrain) | ✅ Done | FR-8 |
| Real-time notifications | ✅ Done | FR-14 |
| Campus chat bot | ✅ Done | FR-22 |
| Assistance request (accessibility) | ✅ Done | FR-13 |
| User GPS location on map | ✅ Done | FR-4 |
| Offline map support | 🔲 Planned | FR-16 |
| 3D building view | 🔲 Planned | FR-17 |
| Route feedback | 🔲 Planned | FR-18 |
| Admin map updates | 🔲 Planned | FR-20 |

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Preview the production build with:
```bash
npm run preview
```

---

## 🔧 Known Issues / Bugs

See the Jira project board for all active bugs and feature tickets.

**Sprint 1 Highlights:**
- Map markers may not render on first load if Leaflet CDN is slow — refresh to fix (SCNA-4)
- Search does not currently search room numbers (SCNA-7)
- Accessibility route polyline only covers 4 buildings (SCNA-9)
- Chat bot responses are static — not connected to live data (SCNA-12)

---

## 👥 Team — Group 1

| Name | Role |
|------|------|
| Member 1 | Frontend / Map Integration |
| Member 2 | Requirements & Backend Data |
| Member 3 | UI Components & Accessibility |
| Member 4 | Testing & Jira Management |

---

## 🔗 Links

- **Jira Board:** [Link to your Jira project]
- **GitHub Repo:** [Link to your GitHub repo]
- **Assignment 3 (Requirements):** See `docs/SENG471_G1_A3.pdf`

---

## 📚 Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.3.1 | UI framework |
| Vite | 5.4.8 | Build tool / dev server |
| Leaflet | 1.9.4 | Real-world map rendering |
| OpenStreetMap | — | Map tile provider (free, open) |

---

## 📝 License

MIT — for academic use, SENG 471 Winter 2026.