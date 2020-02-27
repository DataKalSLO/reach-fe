import React, { useEffect } from 'react';
import ReactMapGL, { Source, Layer, ViewportProps, Marker } from 'react-map-gl';
import { SLO_LATITUDE, SLO_LONGITUDE } from './constants';
import features from '../common/assets/Local Data/census/b25053.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import chroma from 'chroma-js';
import _ from 'lodash';
import Tooltip from './Tooltip';
import { schoolData, data } from './LayersComponent';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

const selection = 'B25053_006E';
const defaultHoveredLocation = {
  properties: {
    [selection]: 0,
    'zip-code-tabulation-area': ''
  },
  noLocation: true
};

function MapView() {
  // React-Map-GL State
  const prepped = prepGeo(features);
  const data = GeoJSON.parse(prepped, { GeoJSON: 'geometry' });
  const [layer, setLayer] = React.useState({
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {},
      'fill-opacity': 0.7
    }
  });
  // Tooltip State
  const [hoveredLocation, setHoveredLocation] = React.useState(
    defaultHoveredLocation
  );
  const x = React.useRef(0);
  const y = React.useRef(0);

  const [viewport, setViewport]: any = React.useState({
    width: '100%',
    height: '60vh',
    latitude: SLO_LATITUDE,
    longitude: SLO_LONGITUDE,
    zoom: 8
  });

  const [selectedInstitutions, setSelectedInstitution] = React.useState(null);

  useEffect(() => {
    const minVal = getStat(features, _.minBy, selection);
    const maxVal = getStat(features, _.maxBy, selection);
    const quantiles_ = 20;
    const colorScale_ = chroma.scale(['white', 'green']).domain([0, 1]);
    const stops = quantileMaker(colorScale_, quantiles_, minVal, maxVal);
    setLayer({
      id: 'data',
      type: 'fill',
      paint: {
        'fill-color': {
          property: selection,
          stops: stops
        },
        'fill-opacity': 0.7
      }
    });
  }, []);

  const renderTooltip = () => {
    if (hoveredLocation.noLocation) {
      return;
    }
    const zipsValue = hoveredLocation.properties[selection];
    const zipCode = hoveredLocation.properties['zip-code-tabulation-area'];
    return (
      <div
        className="tooltip"
        style={{
          left: x.current,
          top: y.current,
          zIndex: 999,
          pointerEvents: 'none',
          position: 'absolute'
        }}
      >
        <Tooltip value={zipsValue} zipCode={zipCode} />
      </div>
    );
  };

  return Object.keys(data).length > 0 ? (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      onHover={event => onHover(setHoveredLocation, event, x, y)}
    >
      <Source type="geojson" data={data}>
        <Layer {...layer} />
      </Source>
      {renderTooltip()}
      {
        // comment out 106-110 to remove the name of the markers from showing up
      }
      {schoolData
        .map(function(collection: any) {
          return markers(collection.features, setSelectedInstitution);
        })
        .flat()}
    </ReactMapGL>
  ) : (
    <div
      style={{
        width: viewport.width,
        height: viewport.height,
        backgroundColor: 'grey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </div>
  );
}

function prepGeo(featureCollection: any) {
  const prepped: any = [];
  featureCollection.forEach((feature: any) => {
    prepped.push({
      geometry: feature.geometry,
      ...feature.properties
    });
  });
  return prepped;
}

function getStat(features: any, extractionFunc: any, selection: any) {
  const stat = extractionFunc(features, function(o: any) {
    return o.properties[selection];
  });
  return stat.properties[selection];
}

function onHover(setHoveredLocation: any, event: any, x: any, y: any) {
  const {
    features,
    srcEvent: { offsetX, offsetY }
  } = event;
  const hoveredLocation =
    features && features.find((f: any) => f.layer.id === 'data');
  if (!hoveredLocation) {
    setHoveredLocation(defaultHoveredLocation);
    return;
  }
  x.current = offsetX > 0 ? offsetX : x;
  y.current = offsetY > 0 ? offsetY : y;
  setHoveredLocation(hoveredLocation);
}

function quantileMaker(colorScale: any, quantiles: any, min: any, max: any) {
  const diff = max - min;
  const bucket = diff / quantiles;
  const dataScale = Array(quantiles)
    .fill(0)
    .map(Number.prototype.valueOf, 0)
    .map(
      function(this: any, val: any, idx: any) {
        return idx === 0 ? min : (this.acc += bucket);
      },
      { acc: min }
    );
  const normalScale = dataScale.map(function(val: any, idx: any) {
    return idx === 0 ? Math.round((min + 1 / max) * 100) / 100 : val / max;
  });
  const chromaScale = normalScale.map(function(val: any) {
    return colorScale(val).hex();
  });
  return _.zip(dataScale, chromaScale);
}

function markers(features: any, setSelectedInstitution: any) {
  return features.map(function(location: any) {
    return (
      <Marker
        key={location[0].properties.name}
        latitude={location[0].geometry.coordinates[0]}
        longitude={location[0].geometry.coordinates[1]}
      >
        {
          // Clicking adds the location to the list and logs the name to console,
          // have not handled unclicking
        }
        <button
          className="marker-button"
          onClick={event => {
            event.preventDefault();
            setSelectedInstitution(location[0]);
            console.log(location[0].properties.name);
          }}
        >
          <div> {location[0].properties.name} </div>
        </button>
      </Marker>
    );
  });
}

export default MapView;
