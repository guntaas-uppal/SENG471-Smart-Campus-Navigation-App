// SCNA-04: Mock building data
// SCNA-16: transitStops export — nearby bus and CTrain stops

// ---------------------------------------------------------------------------
// TRANSIT STOPS (SCNA-16)
// ---------------------------------------------------------------------------
export const transitStops = [
  {
    id: 'ts-1',
    name: 'University Station (CTrain)',
    routes: ['Red Line'],
    mapX: 120,
    mapY: 390,
  },
  {
    id: 'ts-2',
    name: 'Bus Stop – University Dr NW',
    routes: ['Route 9', 'Route 19'],
    mapX: 90,
    mapY: 290,
  },
  {
    id: 'ts-3',
    name: 'Bus Stop – 24 Ave NW',
    routes: ['Route 20', 'Route 403'],
    mapX: 540,
    mapY: 380,
  },
]

// ---------------------------------------------------------------------------
// MOCK NAVIGATION ROUTES (SCNA-08, SCNA-09)
// Each key is "originId-destinationId". Both directions are tried at lookup.
// standard  = normal walking waypoints + steps
// accessible = accessible-route waypoints + steps (used when accessibilityMode on)
// ---------------------------------------------------------------------------
export const mockRoutes = {
  'ict-ms': {
    standard: [
      { x: 345, y: 210 },
      { x: 390, y: 210 },
      { x: 430, y: 187 },
    ],
    accessible: [
      { x: 345, y: 210 },
      { x: 390, y: 225 },
      { x: 415, y: 225 },
      { x: 430, y: 200 },
    ],
    steps: {
      standard: [
        'Exit ICT through the main west entrance.',
        'Walk east along the Science walkway (~2 min).',
        'Enter Mathematical Sciences building.',
        'Estimated total: 4 minutes walking.',
      ],
      accessible: [
        'Exit ICT through the accessible west entrance (automatic doors).',
        'Follow the paved accessible path heading east.',
        'Enter MS via the east accessible entrance (elevator available inside).',
        'Estimated total: 5 minutes, fully accessible route.',
      ],
    },
  },
  'ict-tfdl': {
    standard: [
      { x: 345, y: 210 },
      { x: 345, y: 280 },
      { x: 330, y: 327 },
    ],
    accessible: [
      { x: 345, y: 210 },
      { x: 340, y: 260 },
      { x: 330, y: 295 },
      { x: 330, y: 327 },
    ],
    steps: {
      standard: [
        'Exit ICT south entrance.',
        'Walk south through the main plaza.',
        'Enter TFDL from the east entrance.',
        'Estimated total: 5 minutes walking.',
      ],
      accessible: [
        'Exit ICT accessible south entrance.',
        'Follow paved path through the main plaza.',
        'Enter TFDL via the accessible east entrance with automatic doors.',
        'Estimated total: 6 minutes, fully accessible route.',
      ],
    },
  },
  'msc-ict': {
    standard: [
      { x: 255, y: 200 },
      { x: 280, y: 200 },
      { x: 300, y: 210 },
    ],
    accessible: [
      { x: 255, y: 200 },
      { x: 280, y: 215 },
      { x: 300, y: 215 },
      { x: 300, y: 210 },
    ],
    steps: {
      standard: [
        'Exit MacEwan Student Centre east entrance.',
        'Walk east along the main walkway.',
        'Enter ICT through the main entrance.',
        'Estimated total: 3 minutes walking.',
      ],
      accessible: [
        'Exit MSC accessible east entrance (automatic doors).',
        'Follow the paved accessible path eastward.',
        'Enter ICT via the west accessible entrance (automatic doors).',
        'Estimated total: 4 minutes, fully accessible route.',
      ],
    },
  },
  'edc-st': {
    standard: [
      { x: 240, y: 287 },
      { x: 340, y: 287 },
      { x: 430, y: 285 },
    ],
    accessible: [
      { x: 240, y: 287 },
      { x: 310, y: 295 },
      { x: 400, y: 295 },
      { x: 430, y: 285 },
    ],
    steps: {
      standard: [
        'Exit EDC north entrance.',
        'Walk east along the south campus walkway.',
        'Enter Science Theatre from the west side.',
        'Estimated total: 6 minutes walking.',
      ],
      accessible: [
        'Exit EDC north accessible entrance (ramp).',
        'Follow the paved path east along south campus.',
        'Enter ST via the south ramp entrance.',
        'Estimated total: 7 minutes, fully accessible route.',
      ],
    },
  },
}

// ---------------------------------------------------------------------------
// BUILDINGS (SCNA-04)
// ---------------------------------------------------------------------------
const buildings = [
  {
    id: 'ict',
    name: 'Information and Communications Technology',
    code: 'ICT',
    type: 'Academic',
    description:
      'Home of the Department of Computer Science and Software Engineering. ' +
      'Contains teaching labs, lecture rooms, and faculty offices.',
    hours:
      'Mon–Fri: 7:30 AM – 10:00 PM\nSat: 9:00 AM – 5:00 PM\nSun: Closed',
    floors: 5,
    mapX: 300, mapY: 180, width: 90, height: 60,
    color: '#3b82f6',
    accessibility: {
      elevator: true,
      ramp: true,
      accessibleWashroom: true,
      accessibleEntrance: 'Main entrance on west side, automatic doors.',
      accessibleRoute:
        'Take the elevator in the main lobby to any floor. ' +
        'Accessible washrooms on floors 1, 3, and 5.',
    },
    classrooms: [
      { id: 'ict-101', name: 'ICT 101', type: 'Lecture Hall',  capacity: 120, floor: 1 },
      { id: 'ict-102', name: 'ICT 102', type: 'Seminar Room',  capacity: 40,  floor: 1 },
      { id: 'ict-201', name: 'ICT 201', type: 'Computer Lab',  capacity: 30,  floor: 2 },
      { id: 'ict-301', name: 'ICT 301', type: 'Lecture Room',  capacity: 60,  floor: 3 },
      { id: 'ict-401', name: 'ICT 401', type: 'Research Lab',  capacity: 20,  floor: 4 },
    ],
    floorPlan: {
      1: [
        { label: 'ICT 101',    x: 30,  y: 30, w: 110, h: 55, type: 'lecture'  },
        { label: 'ICT 102',    x: 160, y: 30, w: 80,  h: 55, type: 'seminar'  },
        { label: 'Washroom',   x: 260, y: 30, w: 70,  h: 55, type: 'washroom' },
        { label: 'Elevator',   x: 350, y: 30, w: 50,  h: 55, type: 'elevator' },
        { label: 'Main Lobby', x: 30,  y: 105, w: 370, h: 50, type: 'common'  },
      ],
      2: [
        { label: 'ICT 201 Lab', x: 30,  y: 30, w: 140, h: 55, type: 'lab'      },
        { label: 'ICT 202',     x: 190, y: 30, w: 100, h: 55, type: 'seminar'  },
        { label: 'Elevator',    x: 310, y: 30, w: 50,  h: 55, type: 'elevator' },
        { label: 'Washroom',    x: 375, y: 30, w: 55,  h: 55, type: 'washroom' },
        { label: 'Study Area',  x: 30,  y: 105, w: 200, h: 50, type: 'common'  },
      ],
      3: [
        { label: 'ICT 301',       x: 30,  y: 30, w: 120, h: 55, type: 'lecture'  },
        { label: 'ICT 302',       x: 170, y: 30, w: 100, h: 55, type: 'seminar'  },
        { label: 'Accessible WR', x: 290, y: 30, w: 80,  h: 55, type: 'washroom' },
        { label: 'Elevator',      x: 390, y: 30, w: 40,  h: 55, type: 'elevator' },
      ],
      4: [
        { label: 'ICT 401 Research', x: 30,  y: 30, w: 150, h: 55, type: 'lab'     },
        { label: 'ICT 402',          x: 200, y: 30, w: 100, h: 55, type: 'office'  },
        { label: 'Elevator',         x: 320, y: 30, w: 50,  h: 55, type: 'elevator'},
      ],
      5: [
        { label: 'Faculty Offices', x: 30,  y: 30, w: 200, h: 55, type: 'office'  },
        { label: 'Accessible WR',   x: 250, y: 30, w: 80,  h: 55, type: 'washroom'},
        { label: 'Elevator',        x: 350, y: 30, w: 50,  h: 55, type: 'elevator'},
      ],
    },
  },
  {
    id: 'ms',
    name: 'Mathematical Sciences',
    code: 'MS',
    type: 'Academic',
    description:
      'Houses the Department of Mathematics and Statistics. Features lecture ' +
      'theatres, faculty offices, and student study lounges.',
    hours: 'Mon–Fri: 8:00 AM – 8:00 PM\nSat–Sun: Closed',
    floors: 4,
    mapX: 430, mapY: 160, width: 75, height: 55,
    color: '#8b5cf6',
    accessibility: {
      elevator: true,
      ramp: false,
      accessibleWashroom: true,
      accessibleEntrance: 'East entrance via the connector hallway from ICT.',
      accessibleRoute:
        'Elevator located near the east entrance. ' +
        'Accessible washrooms on floors 1 and 3.',
    },
    classrooms: [
      { id: 'ms-110', name: 'MS 110', type: 'Lecture Theatre', capacity: 200, floor: 1 },
      { id: 'ms-211', name: 'MS 211', type: 'Tutorial Room',   capacity: 35,  floor: 2 },
      { id: 'ms-325', name: 'MS 325', type: 'Seminar Room',    capacity: 30,  floor: 3 },
    ],
    floorPlan: {
      1: [
        { label: 'MS 110 Theatre', x: 30,  y: 30, w: 160, h: 70, type: 'lecture'  },
        { label: 'Washroom',       x: 210, y: 30, w: 70,  h: 70, type: 'washroom' },
        { label: 'Elevator',       x: 300, y: 30, w: 50,  h: 70, type: 'elevator' },
        { label: 'Info Desk',      x: 30,  y: 120, w: 120, h: 40, type: 'common'  },
      ],
      2: [
        { label: 'MS 211',  x: 30,  y: 30, w: 110, h: 55, type: 'seminar'  },
        { label: 'MS 212',  x: 160, y: 30, w: 110, h: 55, type: 'seminar'  },
        { label: 'Elevator',x: 290, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
      3: [
        { label: 'MS 325',        x: 30,  y: 30, w: 120, h: 55, type: 'seminar'  },
        { label: 'Accessible WR', x: 170, y: 30, w: 80,  h: 55, type: 'washroom' },
        { label: 'Elevator',      x: 270, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
      4: [
        { label: 'Faculty Offices', x: 30,  y: 30, w: 190, h: 55, type: 'office'  },
        { label: 'Elevator',        x: 240, y: 30, w: 50,  h: 55, type: 'elevator'},
      ],
    },
  },
  {
    id: 'st',
    name: 'Science Theatre',
    code: 'ST',
    type: 'Lecture',
    description:
      'A large auditorium-style lecture complex. Hosts introductory science ' +
      'courses with seating for hundreds of students.',
    hours: 'Mon–Fri: 8:00 AM – 9:00 PM\nSat: 10:00 AM – 4:00 PM\nSun: Closed',
    floors: 2,
    mapX: 430, mapY: 260, width: 85, height: 50,
    color: '#10b981',
    accessibility: {
      elevator: false,
      ramp: true,
      accessibleWashroom: true,
      accessibleEntrance: 'Ramp on the south side of the building.',
      accessibleRoute:
        'No elevator. Accessible seating on ground level of all theatres. ' +
        'Accessible washrooms on floor 1.',
    },
    classrooms: [
      { id: 'st-140', name: 'ST 140', type: 'Theatre', capacity: 500, floor: 1 },
      { id: 'st-148', name: 'ST 148', type: 'Theatre', capacity: 300, floor: 1 },
      { id: 'st-241', name: 'ST 241', type: 'Theatre', capacity: 200, floor: 2 },
    ],
    floorPlan: {
      1: [
        { label: 'ST 140',        x: 30,  y: 30, w: 150, h: 80, type: 'lecture'  },
        { label: 'ST 148',        x: 200, y: 30, w: 130, h: 80, type: 'lecture'  },
        { label: 'Accessible WR', x: 350, y: 30, w: 80,  h: 80, type: 'washroom' },
        { label: 'Ramp Entry',    x: 30,  y: 130, w: 90, h: 35, type: 'common'  },
      ],
      2: [
        { label: 'ST 241',   x: 30,  y: 30, w: 200, h: 80, type: 'lecture'  },
        { label: 'Washroom', x: 250, y: 30, w: 80,  h: 80, type: 'washroom' },
      ],
    },
  },
  {
    id: 'edc',
    name: 'Engineering Design Centre',
    code: 'EDC',
    type: 'Lab / Design',
    description:
      'Engineering innovation hub with machine shops, design studios, and ' +
      'prototyping labs. Home to capstone projects and student design teams.',
    hours:
      'Mon–Fri: 7:00 AM – 11:00 PM\nSat: 9:00 AM – 6:00 PM\nSun: 12:00 PM – 6:00 PM',
    floors: 3,
    mapX: 160, mapY: 260, width: 80, height: 55,
    color: '#f59e0b',
    accessibility: {
      elevator: true,
      ramp: true,
      accessibleWashroom: true,
      accessibleEntrance: 'Main north entrance has automatic sliding doors and a ramp.',
      accessibleRoute: 'Elevator in central atrium. Accessible washrooms on all floors.',
    },
    classrooms: [
      { id: 'edc-101', name: 'EDC 101', type: 'Design Studio', capacity: 50, floor: 1 },
      { id: 'edc-201', name: 'EDC 201', type: 'Machine Shop',  capacity: 25, floor: 2 },
      { id: 'edc-301', name: 'EDC 301', type: 'Capstone Lab',  capacity: 40, floor: 3 },
    ],
    floorPlan: {
      1: [
        { label: 'EDC 101 Studio', x: 30,  y: 30, w: 140, h: 60, type: 'lab'      },
        { label: 'Accessible WR',  x: 190, y: 30, w: 80,  h: 60, type: 'washroom' },
        { label: 'Elevator',       x: 290, y: 30, w: 50,  h: 60, type: 'elevator' },
        { label: 'Ramp Entry',     x: 360, y: 30, w: 70,  h: 60, type: 'common'   },
      ],
      2: [
        { label: 'Machine Shop',  x: 30,  y: 30, w: 150, h: 60, type: 'lab'      },
        { label: 'EDC 202',       x: 200, y: 30, w: 100, h: 60, type: 'seminar'  },
        { label: 'Accessible WR', x: 320, y: 30, w: 80,  h: 60, type: 'washroom' },
        { label: 'Elevator',      x: 420, y: 30, w: 50,  h: 60, type: 'elevator' },
      ],
      3: [
        { label: 'Capstone Lab',  x: 30,  y: 30, w: 170, h: 60, type: 'lab'     },
        { label: 'Conference Rm', x: 220, y: 30, w: 110, h: 60, type: 'seminar' },
        { label: 'Elevator',      x: 350, y: 30, w: 50,  h: 60, type: 'elevator'},
      ],
    },
  },
  {
    id: 'tfdl',
    name: 'Taylor Family Digital Library',
    code: 'TFDL',
    type: 'Library',
    description:
      'The main campus library with 5 floors of study spaces, digital resources, ' +
      'research assistance desks, and quiet study zones.',
    hours:
      'Mon–Thu: 8:00 AM – 12:00 AM\nFri: 8:00 AM – 8:00 PM\nSat–Sun: 10:00 AM – 8:00 PM',
    floors: 5,
    mapX: 280, mapY: 295, width: 100, height: 65,
    color: '#ef4444',
    accessibility: {
      elevator: true,
      ramp: true,
      accessibleWashroom: true,
      accessibleEntrance: 'Main east entrance with automatic doors and level access.',
      accessibleRoute:
        'Two elevators available. Accessible study carrels on every floor. ' +
        'Accessible washrooms on floors 1, 3, and 5.',
    },
    classrooms: [
      { id: 'tfdl-120', name: 'TFDL 120', type: 'Group Study Room', capacity: 8,  floor: 1 },
      { id: 'tfdl-220', name: 'TFDL 220', type: 'Quiet Study Zone', capacity: 60, floor: 2 },
      { id: 'tfdl-320', name: 'TFDL 320', type: 'Research Desk',    capacity: 10, floor: 3 },
    ],
    floorPlan: {
      1: [
        { label: 'Information Desk', x: 30,  y: 30, w: 130, h: 55, type: 'common'   },
        { label: 'Group Study 120',  x: 180, y: 30, w: 110, h: 55, type: 'seminar'  },
        { label: 'Accessible WR',    x: 310, y: 30, w: 80,  h: 55, type: 'washroom' },
        { label: 'Elevator',         x: 410, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
      2: [
        { label: 'Quiet Study Zone', x: 30,  y: 30, w: 200, h: 55, type: 'common'   },
        { label: 'Washroom',         x: 250, y: 30, w: 80,  h: 55, type: 'washroom' },
        { label: 'Elevator',         x: 350, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
      3: [
        { label: 'Research Desk',  x: 30,  y: 30, w: 130, h: 55, type: 'common'   },
        { label: 'Study Carrels',  x: 180, y: 30, w: 120, h: 55, type: 'common'   },
        { label: 'Accessible WR',  x: 320, y: 30, w: 80,  h: 55, type: 'washroom' },
        { label: 'Elevator',       x: 420, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
      4: [
        { label: 'Special Collections', x: 30,  y: 30, w: 160, h: 55, type: 'office'  },
        { label: 'Washroom',            x: 210, y: 30, w: 80,  h: 55, type: 'washroom'},
        { label: 'Elevator',            x: 310, y: 30, w: 50,  h: 55, type: 'elevator'},
      ],
      5: [
        { label: 'Digital Scholarship', x: 30,  y: 30, w: 160, h: 55, type: 'lab'     },
        { label: 'Accessible WR',       x: 210, y: 30, w: 80,  h: 55, type: 'washroom'},
        { label: 'Elevator',            x: 310, y: 30, w: 50,  h: 55, type: 'elevator'},
      ],
    },
  },
  {
    id: 'msc',
    name: 'MacEwan Student Centre',
    code: 'MSC',
    type: 'Student Services',
    description:
      'Student hub with the food court, SU offices, lounges, the bookstore, ' +
      'and various student services.',
    hours: 'Mon–Fri: 7:00 AM – 10:00 PM\nSat–Sun: 10:00 AM – 6:00 PM',
    floors: 3,
    mapX: 160, mapY: 170, width: 95, height: 60,
    color: '#06b6d4',
    accessibility: {
      elevator: true,
      ramp: true,
      accessibleWashroom: true,
      accessibleEntrance: 'All entrances are accessible with automatic doors.',
      accessibleRoute: 'Elevator near the south entrance. Accessible washrooms on all floors.',
    },
    classrooms: [
      { id: 'msc-g01', name: 'MSC G01', type: 'Meeting Room', capacity: 20,  floor: 1 },
      { id: 'msc-201', name: 'MSC 201', type: 'Event Space',  capacity: 100, floor: 2 },
    ],
    floorPlan: {
      1: [
        { label: 'Food Court',   x: 30,  y: 30, w: 180, h: 65, type: 'common'   },
        { label: 'Bookstore',    x: 230, y: 30, w: 110, h: 65, type: 'common'   },
        { label: 'Accessible WR',x: 360, y: 30, w: 70,  h: 65, type: 'washroom' },
        { label: 'Elevator',     x: 450, y: 30, w: 50,  h: 65, type: 'elevator' },
      ],
      2: [
        { label: 'SU Offices',  x: 30,  y: 30, w: 140, h: 55, type: 'office'   },
        { label: 'Event Space', x: 190, y: 30, w: 140, h: 55, type: 'lecture'  },
        { label: 'Washroom',    x: 350, y: 30, w: 70,  h: 55, type: 'washroom' },
        { label: 'Elevator',    x: 440, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
      3: [
        { label: 'Student Lounge', x: 30,  y: 30, w: 180, h: 55, type: 'common'   },
        { label: 'Accessible WR',  x: 230, y: 30, w: 80,  h: 55, type: 'washroom' },
        { label: 'Elevator',       x: 330, y: 30, w: 50,  h: 55, type: 'elevator' },
      ],
    },
  },
]

export default buildings
