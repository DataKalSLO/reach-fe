import React, { useEffect } from 'react';
import ReactMapGL, { Source, Layer, Marker, Popup } from 'react-map-gl';
import { SLO_LATITUDE, SLO_LONGITUDE } from './constants';
import features from '../common/assets/Local Data/census/b25053.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import RoomIcon from '@material-ui/icons/Room';
import chroma from 'chroma-js';
import _ from 'lodash';
import Tooltip from './Tooltip';
import { blue, purple, red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {
  LocationFeatures,
  MapViewProps,
  SelectedMarker,
  SetSelectedMarker
} from './MapTypes';
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

function MapView(props: MapViewProps) {
  const { layerSelection, selectedMarker, setSelectedMarker } = props;
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
  const [outline, setOutline] = React.useState({
    id: 'outline',
    type: 'line',
    paint: {
      'line-color': 'rgb(0, 0, 0)'
    }
  });

  // Tooltip State
  const [hoveredLocation, setHoveredLocation] = React.useState(
    defaultHoveredLocation
  );
  const x = React.useRef(0);
  const y = React.useRef(0);

  const markerColors = [
    { color: red[500] },
    { color: blue[500] },
    { color: purple[500] }
  ];

  const [colorAssociation, setColorAssociation] = React.useState({});

  useEffect(() => {
    const newColorAssociation: {
      [name: string]: { [color: string]: string };
    } = {};
    layerSelection.forEach((layer, index) => {
      newColorAssociation[layer.name] = markerColors[index];
    });

    setColorAssociation(newColorAssociation);
    // This disable prevents an eslint quickfix from createing a circular dependency and freezeing the screen
    // eslint-disable-next-line
  }, [layerSelection]);

  const [viewport, setViewport]: any = React.useState({
    width: '100%',
    height: '60vh',
    latitude: SLO_LATITUDE,
    longitude: SLO_LONGITUDE,
    zoom: 8
  });

  // TODO: Make the types work
  //   const [viewport, setViewport]: [
  //     ViewportProps,
  //     Dispatch<SetStateAction<ViewportProps>>
  //   ] = React.useState({
  //     width: 790,
  //     height: 600,
  //     latitude: SLO_LATITUDE,
  //     longitude: SLO_LONGITUDE,
  //     zoom: 8,
  //     bearing: 0,
  //     pitch: 0,
  //     altitude: 1.5,
  //     maxZoom: 20,
  //     minZoom: 0,
  //     maxPitch: 60,
  //     minPitch: 0
  //  });

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
    setOutline({
      id: 'outline',
      type: 'line',
      paint: {
        'line-color': 'rgb(0, 0, 0)'
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
        <Layer {...outline} />
      </Source>
      {renderTooltip()}
      {layerSelection
        .map(
          (collection: {
            type: string;
            name: string;
            features: LocationFeatures[][];
          }) => {
            return markers(
              collection.features,
              setSelectedMarker,
              selectedMarker,
              colorAssociation,
              collection.name
            );
          }
        )
        .flat()}
      {selectedMarker.map((selected: LocationFeatures) => {
        return popups(selected, setSelectedMarker, selectedMarker);
      })}
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

// TODO: Had trouble creating an interface for featureCollection
// Tried to create an interface using the type from features on line 34
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

function getStat(features: any, extractionFunc: any, selection: string) {
  const stat = extractionFunc(features, (o: any) => {
    return o.properties[selection];
  });
  return stat.properties[selection];
}

function onHover(
  setHoveredLocation: React.Dispatch<
    React.SetStateAction<{
      properties: {
        [selection]: number;
        'zip-code-tabulation-area': string;
      };
      noLocation: boolean;
    }>
  >,
  event: any,
  x: React.MutableRefObject<number>,
  y: React.MutableRefObject<number>
) {
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

function quantileMaker(
  colorScale: chroma.Scale<chroma.Color>,
  quantiles: number,
  min: number,
  max: number
) {
  const diff = max - min;
  const bucket = diff / quantiles;
  const dataScale = Array(quantiles)
    .fill(0)
    .map(Number.prototype.valueOf, 0)
    .map(
      function(this: any, val: number, idx: number) {
        return idx === 0 ? min : (this.acc += bucket);
      },
      { acc: min }
    );
  const normalScale = dataScale.map((val: number, idx: number) => {
    return idx === 0 ? Math.round((min + 1 / max) * 100) / 100 : val / max;
  });
  const chromaScale = normalScale.map((val: number) => {
    return colorScale(val).hex();
  });
  return _.zip(dataScale, chromaScale);
}

const MarkerButton = styled(Button)({
  background: 'none',
  border: 'none',
  // More magic numbers to size the marker
  cursor: 'pointer',
  minWidth: '20px',
  maxWidth: '20px',
  minHeight: '30px',
  maxHeight: '25px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent'
  }
});

function markers(
  features: LocationFeatures[][],
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker,
  colorAssociation: any,
  layer: string
) {
  return features.map((location: LocationFeatures[]) => {
    const datapoint = location[0];
    return (
      <Marker
        key={datapoint.properties.name}
        latitude={datapoint.geometry.coordinates[0]}
        longitude={datapoint.geometry.coordinates[1]}
      >
        <MarkerButton
          onClick={event => {
            event.preventDefault();
            if (!selectedMarker.includes(location[0])) {
              setSelectedMarker(selectedMarker.concat(location[0]));
            }
          }}
        >
          <div>
            <RoomIcon style={colorAssociation[layer]} />
          </div>
        </MarkerButton>
      </Marker>
    );
  });
}

function popups(
  marker: LocationFeatures,
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker
) {
  return (
    <Popup
      key={marker.properties.name}
      latitude={marker.geometry.coordinates[0]}
      longitude={marker.geometry.coordinates[1]}
      anchor="bottom"
      onClose={() => {
        setSelectedMarker(
          selectedMarker.filter(
            (obj: {
              type: string;
              geometry: { type: string; coordinates: number[] };
              properties: { name: string };
            }) => obj !== marker
          )
        );
      }}
      closeOnClick={false}
      sortByDepth={true}
      // magic number to center the pop-up tooltip
      offsetLeft={10}
    >
      <div>{marker.properties.name}</div>
    </Popup>
  );
}

export default MapView;
