// src/data/buildings.js
// ─────────────────────────────────────────────────────────────────────────────
// SCRUM-20: Complete buildings.js Data
//   Adds: mapX, mapY, width, height, color (SVG positioning)
//         classrooms[] array per building (id, name, type, floor, capacity)
//         accessibility{} sub-object (elevator, ramp, accessibleWashroom,
//           accessibleWashroomFloor, accessibleEntrance, accessibleRoute)
//   Also adds named exports: transitStops, mockRoutes
//   (used by CampusMap and NavigationPanel)
// ─────────────────────────────────────────────────────────────────────────────

const buildings = [
  {
    id: "ict",
    name: "Information and Communications Technology",
    code: "ICT",
    lat: 51.0779, lng: -114.1370,
    // SVG map position (620×430 viewport)
    mapX: 80,  mapY: 150,  width: 90,  height: 60,
    color: "#2563eb",
    floors: 5,
    hours: "Mon-Fri 7:30am-10pm",
    type: "Academic",
    description: "Home of CS and SENG departments.",
    // Flat flags kept for backward compat
    hasElevator: true, hasRamp: true, hasAccessibleWashroom: true,
    // Structured sub-object used by BuildingPanel & CampusMap
    accessibility: {
      elevator: true, ramp: true,
      accessibleWashroom: true, accessibleWashroomFloor: 1,
      accessibleEntrance: "South entrance, Level 1",
      accessibleRoute: "Use south ramp from Ring Road path",
    },
    classrooms: [
      { id: "ict-116", name: "ICT 116", type: "Lecture", floor: 1, capacity: 60 },
      { id: "ict-121", name: "ICT 121", type: "Lab",     floor: 1, capacity: 30 },
      { id: "ict-316", name: "ICT 316", type: "Seminar", floor: 3, capacity: 25 },
      { id: "ict-416", name: "ICT 416", type: "Lecture", floor: 4, capacity: 80 },
    ],
  },
  {
    id: "ms",
    name: "Mathematical Sciences",
    code: "MS",
    lat: 51.0790, lng: -114.1350,
    mapX: 210, mapY: 150, width: 80, height: 60,
    color: "#7c3aed",
    floors: 4,
    hours: "Mon-Fri 8am-8pm",
    type: "Academic",
    description: "Mathematics and Statistics.",
    hasElevator: true, hasRamp: false, hasAccessibleWashroom: true,
    accessibility: {
      elevator: true, ramp: false,
      accessibleWashroom: true, accessibleWashroomFloor: 2,
      accessibleEntrance: "Main entrance, Level 1 (no ramp — use ICT tunnel)",
      accessibleRoute: "Cross via ICT-MS indoor connector on floor 1",
    },
    classrooms: [
      { id: "ms-160", name: "MS 160", type: "Lecture",  floor: 1, capacity: 100 },
      { id: "ms-271", name: "MS 271", type: "Seminar",  floor: 2, capacity: 30  },
      { id: "ms-319", name: "MS 319", type: "Tutorial", floor: 3, capacity: 20  },
    ],
  },
  {
    id: "st",
    name: "Science Theatre",
    code: "ST",
    lat: 51.0802, lng: -114.1340,
    mapX: 330, mapY: 150, width: 80, height: 55,
    color: "#0891b2",
    floors: 2,
    hours: "Mon-Fri 8am-9pm",
    type: "Lecture",
    description: "Large lecture theatres.",
    hasElevator: false, hasRamp: true, hasAccessibleWashroom: true,
    accessibility: {
      elevator: false, ramp: true,
      accessibleWashroom: true, accessibleWashroomFloor: 1,
      accessibleEntrance: "West ramp entrance from main walkway",
      accessibleRoute: "West side path from MacEwan walkway",
    },
    classrooms: [
      { id: "st-140", name: "ST 140", type: "Theatre", floor: 1, capacity: 500 },
      { id: "st-141", name: "ST 141", type: "Theatre", floor: 1, capacity: 500 },
      { id: "st-148", name: "ST 148", type: "Lecture",  floor: 1, capacity: 200 },
    ],
  },
  {
    id: "edc",
    name: "Engineering Design Centre",
    code: "EDC",
    lat: 51.0774, lng: -114.1305,
    mapX: 450, mapY: 240, width: 90, height: 65,
    color: "#d97706",
    floors: 3,
    hours: "Mon-Fri 7am-11pm",
    type: "Lab/Design",
    description: "Engineering design and prototyping labs.",
    hasElevator: true, hasRamp: true, hasAccessibleWashroom: true,
    accessibility: {
      elevator: true, ramp: true,
      accessibleWashroom: true, accessibleWashroomFloor: 1,
      accessibleEntrance: "North entrance with automatic doors",
      accessibleRoute: "Paved accessible path from Engineering Quad",
    },
    classrooms: [
      { id: "edc-180", name: "EDC 180", type: "Workshop",     floor: 1, capacity: 20 },
      { id: "edc-280", name: "EDC 280", type: "Design Lab",   floor: 2, capacity: 40 },
      { id: "edc-380", name: "EDC 380", type: "Project Room", floor: 3, capacity: 15 },
    ],
  },
  {
    id: "lib",
    name: "Taylor Family Digital Library",
    code: "TFDL",
    lat: 51.0784, lng: -114.1295,
    mapX: 450, mapY: 145, width: 90, height: 65,
    color: "#059669",
    floors: 5,
    hours: "Mon-Fri 8am-midnight",
    type: "Library",
    description: "Main campus library with study spaces.",
    hasElevator: true, hasRamp: true, hasAccessibleWashroom: true,
    accessibility: {
      elevator: true, ramp: true,
      accessibleWashroom: true, accessibleWashroomFloor: 1,
      accessibleEntrance: "Main south entrance, fully accessible",
      accessibleRoute: "Central campus path directly to south entrance",
    },
    classrooms: [
      { id: "tfdl-study-1", name: "Study Room 1",    type: "Study Room", floor: 2, capacity: 8  },
      { id: "tfdl-study-2", name: "Study Room 2",    type: "Study Room", floor: 3, capacity: 8  },
      { id: "tfdl-lab-1",   name: "Digital Media Lab", type: "Lab",      floor: 4, capacity: 20 },
    ],
  },
  {
    id: "mac",
    name: "MacEwan Student Centre",
    code: "MSC",
    lat: 51.0771, lng: -114.1315,
    mapX: 210, mapY: 280, width: 100, height: 60,
    color: "#dc2626",
    floors: 2,
    hours: "Mon-Fri 7am-10pm",
    type: "Student Services",
    description: "Student services and food court.",
    hasElevator: true, hasRamp: true, hasAccessibleWashroom: true,
    accessibility: {
      elevator: true, ramp: true,
      accessibleWashroom: true, accessibleWashroomFloor: 1,
      accessibleEntrance: "All entrances are accessible",
      accessibleRoute: "Central campus hub — accessible from all directions",
    },
    classrooms: [
      { id: "msc-dining",    name: "Food Court", type: "Dining", floor: 1, capacity: 200 },
      { id: "msc-bookstore", name: "Bookstore",  type: "Retail", floor: 1, capacity: 50  },
    ],
  },
  {
    id: "bio",
    name: "Biological Sciences",
    code: "BI",
    lat: 51.0808, lng: -114.1355,
    mapX: 330, mapY: 80, width: 80, height: 55,
    color: "#16a34a",
    floors: 4,
    hours: "Mon-Fri 8am-6pm",
    type: "Academic/Lab",
    description: "Life sciences research and classrooms.",
    hasElevator: true, hasRamp: false, hasAccessibleWashroom: false,
    accessibility: {
      elevator: true, ramp: false,
      accessibleWashroom: false, accessibleWashroomFloor: null,
      accessibleEntrance: "East elevator entrance (limited ramp access)",
      accessibleRoute: "Use ST west path then BI east side",
    },
    classrooms: [
      { id: "bi-103", name: "BI 103", type: "Lab",          floor: 1, capacity: 30 },
      { id: "bi-250", name: "BI 250", type: "Lecture",      floor: 2, capacity: 80 },
      { id: "bi-367", name: "BI 367", type: "Research Lab", floor: 3, capacity: 20 },
    ],
  },
  {
    id: "sscp",
    name: "Social Sciences",
    code: "SS",
    lat: 51.0800, lng: -114.1325,
    mapX: 330, mapY: 240, width: 80, height: 60,
    color: "#9333ea",
    floors: 3,
    hours: "Mon-Fri 8am-7pm",
    type: "Academic",
    description: "Social science lectures and offices.",
    hasElevator: false, hasRamp: true, hasAccessibleWashroom: true,
    accessibility: {
      elevator: false, ramp: true,
      accessibleWashroom: true, accessibleWashroomFloor: 1,
      accessibleEntrance: "South entrance ramp (ramp only — no elevator)",
      accessibleRoute: "South campus path to SS south ramp",
    },
    classrooms: [
      { id: "ss-105", name: "SS 105", type: "Seminar", floor: 1, capacity: 30  },
      { id: "ss-423", name: "SS 423", type: "Lecture", floor: 4, capacity: 120 },
    ],
  },
];

// ── Transit Stops — used by CampusMap (SCRUM-19 will wire the toggle) ─────────
export const transitStops = [
  { id: "ts-1", name: "University Station (CTrain)", mapX: 540, mapY: 390, route: "Red Line CTrain"   },
  { id: "ts-2", name: "Bus Loop (North Gate)",       mapX: 300, mapY: 40,  route: "Routes 9, 72, 300" },
  { id: "ts-3", name: "MacEwan Stop (West)",         mapX: 80,  mapY: 320, route: "Routes 19, 23, 93" },
  { id: "ts-4", name: "Engineering Rd Stop",         mapX: 540, mapY: 200, route: "Routes 9, 72"      },
];

// ── Mock Routes — used by NavigationPanel (SCRUM-27 extends these) ────────────
export const mockRoutes = {
  "ict-ms": {
    standard:   [{ x:125,y:180 },{ x:165,y:180 },{ x:210,y:180 }],
    accessible: [{ x:125,y:180 },{ x:165,y:200 },{ x:210,y:180 }],
    steps: {
      standard:   [
        "Exit ICT main entrance (south side).",
        "Turn right on main campus walkway heading east.",
        "Walk 3 minutes along the central path.",
        "Arrive at MS main entrance on the north side.",
      ],
      accessible: [
        "Exit ICT via the south accessible ramp entrance.",
        "Follow the paved accessible path east toward MS.",
        "Enter MS via the accessible north entrance (elevator available inside).",
      ],
    },
  },
  "ict-lib": {
    standard:   [{ x:125,y:180 },{ x:300,y:180 },{ x:450,y:175 }],
    accessible: [{ x:125,y:180 },{ x:300,y:200 },{ x:450,y:175 }],
    steps: {
      standard:   [
        "Exit ICT south entrance.",
        "Follow central campus path east past MS and SS.",
        "Continue east to TFDL south entrance.",
        "Estimated walk: 7 minutes.",
      ],
      accessible: [
        "Exit ICT via south accessible ramp.",
        "Follow the wide accessible path through central campus.",
        "Arrive at TFDL main south entrance (fully accessible).",
      ],
    },
  },
  "mac-edc": {
    standard:   [{ x:260,y:310 },{ x:370,y:310 },{ x:450,y:275 }],
    accessible: [{ x:260,y:310 },{ x:350,y:310 },{ x:450,y:275 }],
    steps: {
      standard:   [
        "Exit MacEwan Student Centre east entrance.",
        "Head east along the south campus path.",
        "Turn north at Engineering Quad.",
        "Arrive at EDC north entrance.",
      ],
      accessible: [
        "Exit MSC via accessible east entrance.",
        "Follow accessible south path eastward.",
        "Use EDC north accessible entrance with automatic doors.",
      ],
    },
  },
  "ms-st": {
    standard:   [{ x:250,y:180 },{ x:290,y:180 },{ x:330,y:175 }],
    accessible: [{ x:250,y:185 },{ x:290,y:185 },{ x:330,y:178 }],
    steps: {
      standard:   [
        "Exit MS east entrance.",
        "Walk east along central walkway.",
        "Arrive at ST west entrance.",
      ],
      accessible: [
        "Exit MS accessible entrance.",
        "Follow wide paved path eastward.",
        "Arrive at ST via west ramp accessible entrance.",
      ],
    },
  },
  "st-lib": {
    standard:   [{ x:370,y:175 },{ x:410,y:175 },{ x:450,y:175 }],
    accessible: [{ x:375,y:178 },{ x:413,y:178 },{ x:453,y:178 }],
    steps: {
      standard:   [
        "Exit ST east entrance.",
        "Walk east along the main path.",
        "Arrive at TFDL south entrance.",
      ],
      accessible: [
        "Exit ST via east accessible ramp.",
        "Follow the wide path to TFDL.",
        "Enter TFDL through the fully accessible south entrance.",
      ],
    },
  },
  "ict-mac": {
    standard:   [{ x:125,y:180 },{ x:125,y:250 },{ x:210,y:310 }],
    accessible: [{ x:125,y:182 },{ x:125,y:252 },{ x:215,y:312 }],
    steps: {
      standard:   [
        "Exit ICT south entrance.",
        "Turn south along west campus path.",
        "Arrive at MacEwan Student Centre north entrance.",
        "Estimated walk: 5 minutes.",
      ],
      accessible: [
        "Exit ICT via south ramp.",
        "Follow accessible path south along the west side.",
        "Enter MSC via any entrance (all accessible).",
      ],
    },
  },
};

export default buildings;
