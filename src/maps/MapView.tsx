import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import React, { useEffect } from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import mapOutline from '../common/assets/Local Data/census/b25053';
import noData from '../common/assets/Local Data/census/noHeatMap';
import {
  MARKER_ONE_COLOR,
  MARKER_THREE_COLOR,
  MARKER_TWO_COLOR,
  NUM_QUANTILES,
  PLACER,
  SLO_LATITUDE,
  SLO_LONGITUDE,
  ZIP_TABULATION
} from './constants';
import { mapMarkers } from './MapMarker';
import Popups from './MapPopups';
import {
  cursorWithinBounds,
  getStat,
  onHover,
  position,
  prepGeo,
  quantileMaker,
  tooltipOverlapsMarkers
} from './MapViewHelpers';
import Tooltip from './Tooltip';
import {
  ColorAssociation,
  HeatMapSelection,
  LocationFeatures,
  MarkerSelection,
  PrepGeoObject,
  SelectedMarker,
  SetColorAssociation,
  SetSelectedMarker
} from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

const defaultHoveredLocation = {
  properties: {
    [PLACER]: '1',
    ZIP_TABULATION
  },
  noLocation: true
};

interface MapViewProps {
  markerSelection: MarkerSelection[];
  heatMapSelection: HeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
  colorAssociation: ColorAssociation;
  setColorAssociation: SetColorAssociation;
}

function MapView(props: MapViewProps) {
  const {
    markerSelection,
    heatMapSelection,
    selectedMarker,
    setSelectedMarker,
    colorAssociation,
    setColorAssociation
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

  const VIEWPORT_WIDTH = '100%';
  const VIEWPORT_HEIGHT = '45vh';
  const VIEWPORT_DISPLAY = 'flex';
  const VIEWPORT_FLEX_FLOW = 'row';
  const VIEWPORT_ZOOM = 8;

  const Z_INDEX = 1;

  // map outlines
  const outlinesPrepped = prepGeo(mapOutline.features);
  const outlineData = GeoJSON.parse(outlinesPrepped, { GeoJSON: 'geometry' });

  // React-Map-GL State
  const [dims, setDims] = React.useState(new DOMRect(0, 0, 0, 0));
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
  const [opacity, setOpacity] = React.useState(0);
  const [cursorWithinMap, setCursorWithinMap] = React.useState(false);
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
    { color: MARKER_ONE_COLOR },
    { color: MARKER_TWO_COLOR },
    { color: MARKER_THREE_COLOR }
  ];

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewport, setViewport]: any = React.useState({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    display: VIEWPORT_DISPLAY,
    flexFlow: VIEWPORT_FLEX_FLOW,
    latitude: SLO_LATITUDE,
    longitude: SLO_LONGITUDE,
    zoom: VIEWPORT_ZOOM
  });

  const renderTooltip = () => {
    const map = document.getElementById('map');
    if (!map) {
      return;
    }

    const bounds = map.getBoundingClientRect();
    const properOpacity =
      hoveredLocation.noLocation ||
      tooltipOverlapsMarkers(dims) ||
      !cursorWithinMap
        ? 0
        : 1;
    if (opacity !== properOpacity) {
      setOpacity(properOpacity);
    }
    const left = position(bounds.left, bounds.right, dims.width, x.current);
    const top = position(bounds.top, bounds.bottom, dims.height, y.current);

    const zipsValue = hoveredLocation.properties[valueKey];
    const zipCode = hoveredLocation.properties[ZIP_TABULATION];

    return (
      <div
        id="map-tooltip"
        style={{
          opacity,
          top,
          left,
          zIndex: Z_INDEX,
          pointerEvents: 'none',
          position: 'absolute'
        }}
      >
        <Tooltip value={parseInt(zipsValue)} zipCode={zipCode} />
      </div>
    );
  };

  const handleMouseMove = (event: MouseEvent) => {
    const map = document.getElementById('map');
    if (!map) {
      return;
    }
    const cursorIsWithinBounds = cursorWithinBounds(
      event.pageX,
      event.pageY,
      map.getBoundingClientRect()
    );
    if (!map || (!cursorIsWithinBounds && opacity !== 0 && cursorWithinMap)) {
      setCursorWithinMap(false);
      setOpacity(0);
    } else {
      if (!cursorWithinMap && cursorIsWithinBounds) {
        setCursorWithinMap(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });

  useEffect(() => {
    const minVal = getStat(heatMapFeatures, _.minBy, valueKey);
    const maxVal = getStat(heatMapFeatures, _.maxBy, valueKey);
    const quantiles_ = NUM_QUANTILES;
    const stops = quantileMaker(quantiles_, minVal, maxVal);
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

  if (Object.keys(data).length > 0) {
    return (
      <Grid container id="map">
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
          {...viewport}
          onViewportChange={viewport => {
            viewport.width = window.innerWidth;
            setViewport(viewport);
          }}
          onHover={event =>
            onHover(
              defaultHoveredLocation,
              setHoveredLocation,
              event,
              x,
              y,
              dims,
              setDims
            )
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
        </ReactMapGL>
      </Grid>
    );
  } else {
    return (
      <div
        style={{
          width: viewport.width,
          height: viewport.height,
          backgroundColor: 'grey',
          display: 'flex',
          flexFlow: 'row',
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
