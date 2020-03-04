// college data
const CollegeData = {
  type: 'FeatureCollection',
  name: 'Colleges',
  features: [
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.305, -120.6625]
        },
        properties: {
          name: 'Cal Poly, SLO'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.3292, -120.7401]
        },
        properties: {
          name: 'Cuesta College'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [34.9446, -120.4189]
        },
        properties: {
          name: 'Allan Hancock College'
        }
      }
    ]
  ]
};

// high school data
const HighSchoolData = {
  type: 'FeatureCollection',
  name: 'High Schools',
  features: [
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.2829, -120.6517]
        },
        properties: {
          name: 'San Luis Obispo High School'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.1161, -120.5806]
        },
        properties: {
          name: 'Arroyo Grande High School'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.2901, -120.4017]
        },
        properties: {
          name: 'Atascadero High School'
        }
      }
    ]
  ]
};

export const markerData = [CollegeData, HighSchoolData];
