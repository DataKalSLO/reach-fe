import CircularProgress from '@material-ui/core/CircularProgress';
import { blue, purple, red } from '@material-ui/core/colors';
import chroma from 'chroma-js';
import _ from 'lodash';
import React, { useEffect } from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import mapOutline from '../common/assets/Local Data/census/b25053';
import noData from '../common/assets/Local Data/census/noHeatMap';
import {
  NUM_QUANTILES,
  PLACER,
  SLO_LATITUDE,
  SLO_LONGITUDE,
  ZIP_TABULATION
} from './constants';
import { ChipLegend } from './Legend';
import { mapMarkers } from './MapMarker';
import Popups from './MapPopups';
import {
  ColorAssociation,
  LocationFeatures,
  MapViewProps,
  PrepGeoObject,
  SetColorAssociation
} from './MapTypes';
import { getStat, onHover, prepGeo, quantileMaker } from './MapViewHelpers';
import Tooltip from './Tooltip';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

const defaultHoveredLocation = {
  properties: {
    [PLACER]: '1',
    ZIP_TABULATION
  },
  noLocation: true
};

function MapView(props: MapViewProps) {
  const {
    markerSelection,
    heatMapSelection,
    selectedMarker,
    setSelectedMarker
  } = props;
  // heat map prepped here
  let heatMapFeatures: PrepGeoObject[] | null = null;
  let valueKey = '';
  if (Object.keys(heatMapSelection).length) {
    heatMapFeatures = heatMapSelection.features;
    valueKey = heatMapSelection.valueKey;
  } else {
    heatMapFeatures = noData.features;
    valueKey = noData.valueKey;
  }
  const prepped = prepGeo(heatMapFeatures);
  const data = GeoJSON.parse(prepped, { GeoJSON: 'geometry' });

  // map outlines
  const outlinesPrepped = prepGeo(mapOutline.features);
  const outlineData = GeoJSON.parse(outlinesPrepped, { GeoJSON: 'geometry' });

  // React-Map-GL State
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
  const [hoveredLocation, setHoveredLocation] = React.useState({
    properties: {
      [valueKey]: '1',
      ZIP_TABULATION
    },
    noLocation: true
  });
  const x = React.useRef(0);
  const y = React.useRef(0);

  const markerColors = [
    { color: red[500] },
    { color: blue[500] },
    { color: purple[500] }
  ];

  const [colorAssociation, setColorAssociation]: [
    ColorAssociation,
    SetColorAssociation
  ] = React.useState({});

  useEffect(() => {
    const newColorAssociation: ColorAssociation = {};
    markerSelection.forEach((marker, index) => {
      newColorAssociation[marker.name] = markerColors[index];
    });

    setColorAssociation(newColorAssociation);
    // This disable prevents an eslint quickfix from createing a circular dependency and freezeing the screen
    // eslint-disable-next-line
  }, [markerSelection]);

  // TODO: going to solve "any" errors at a later time
  // eslint-disable-next-line
  const [viewport, setViewport]: any = React.useState({
    width: '90%',
    height: '60vh',
    latitude: SLO_LATITUDE,
    longitude: SLO_LONGITUDE,
    zoom: 8
  });

  useEffect(() => {
    const minVal = getStat(heatMapFeatures, _.minBy, valueKey);
    const maxVal = getStat(heatMapFeatures, _.maxBy, valueKey);
    const quantiles_ = NUM_QUANTILES;
    const colorScale_ = chroma.scale(['white', 'green']).domain([0, 1]);
    const stops = quantileMaker(colorScale_, quantiles_, minVal, maxVal);
    setLayer({
      id: 'data',
      type: 'fill',
      paint: {
        'fill-color': {
          property: valueKey,
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
  }, [heatMapFeatures, valueKey]);

  const renderTooltip = () => {
    if (hoveredLocation.noLocation) {
      return;
    }
    const zipsValue = hoveredLocation.properties[valueKey];
    const zipCode = hoveredLocation.properties[ZIP_TABULATION];
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
        <Tooltip value={parseInt(zipsValue)} zipCode={zipCode} />
      </div>
    );
  };

  if (Object.keys(data).length > 0) {
    return (
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        onHover={event =>
          onHover(defaultHoveredLocation, setHoveredLocation, event, x, y)
        }
      >
        <Source type="geojson" data={data}>
          <Layer {...layer} />
        </Source>
        <Source type="geojson" data={outlineData}>
          <Layer {...outline} />
        </Source>

        {renderTooltip()}
        {mapMarkers(
          markerSelection,
          setSelectedMarker,
          selectedMarker,
          colorAssociation
        )}
        {selectedMarker.map((selected: LocationFeatures) => {
          return Popups(selected, setSelectedMarker, selectedMarker);
        })}
        <ChipLegend
          valueKey={valueKey}
          heatMapSelection={heatMapSelection}
          colorAssociation={colorAssociation}
          markerSelection={markerSelection}
        />
      </ReactMapGL>
    );
  } else {
    return (
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
}

export default MapView;