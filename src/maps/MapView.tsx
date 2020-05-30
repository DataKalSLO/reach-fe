import CircularProgress from '@material-ui/core/CircularProgress';
import chroma from 'chroma-js';
import _ from 'lodash';
import React, { useEffect } from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import mapOutline from '../common/assets/Local Data/census/b25053';
import noData from '../common/assets/Local Data/census/noHeatMap';
import { updateColorAssociation } from '../redux/map/actions';
import {
  HEAT_MAP_COLOR,
  NUM_QUANTILES,
  PLACER,
  SLO_LATITUDE,
  SLO_LONGITUDE,
  ZIP_TABULATION
} from './constants';
import { mapMarkers } from './MapMarker';
import Popups from './MapPopups';
import {
  getStat,
  onHover,
  position,
  prepGeo,
  quantileMaker,
  tooltipOverlapsMarkers,
  cursorWithinBounds
} from './MapViewHelpers';
import Tooltip from './Tooltip';
import { Grid } from '@material-ui/core';
import {
  MarkerSelection,
  HeatMapSelection,
  SelectedMarker,
  ColorAssociation,
  PrepGeoObject,
  MarkerFeatures
} from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

const defaultHoveredLocation = {
  properties: {
    value: '1',
    name: ''
  },
  noLocation: true
};

interface MapViewProps {
  markerSelection: MarkerSelection[];
  heatMapSelection: HeatMapSelection | {};
  selectedMarker: SelectedMarker;
  colorAssociation: ColorAssociation;
}

function MapView(props: MapViewProps) {
  const {
    markerSelection,
    heatMapSelection,
    selectedMarker,
    colorAssociation
  } = props;
  const dispatch = useDispatch();
  // heat map prepped here
  // let heatMapFeatures: PrepGeoObject[] | null = null;
  let heatMapFeatures: any;
  const valueKey = 'value';
  if (Object.keys(heatMapSelection).length) {
    const heatMap = heatMapSelection as HeatMapSelection;
    heatMapFeatures = heatMap.features;
  } else {
    heatMapFeatures = noData.features;
  }
  const prepped = prepGeo(heatMapFeatures);
  const data = GeoJSON.parse(prepped, { GeoJSON: 'geometry' });

  const VIEWPORT_WIDTH = '100%';
  const VIEWPORT_HEIGHT = '45vh';
  const VIEWPORT_DISPLAY = 'flex';
  const VIEWPORT_FLEX_FLOW = 'row';
  const VIEWPORT_ZOOM = 8;

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
  const [hoveredLocation, setHoveredLocation] = React.useState({
    properties: {
      [valueKey]: '1',
      name: ''
    },
    noLocation: true
  });
  const x = React.useRef(0);
  const y = React.useRef(0);

  useEffect(() => {
    dispatch(updateColorAssociation());
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

  const handleMouseMove = (event: MouseEvent) => {
    const map = document.getElementById('map');
    if (
      !map ||
      (!cursorWithinBounds(
        event.pageX,
        event.pageY,
        map.getBoundingClientRect()
      ) &&
        opacity !== 0)
    ) {
      setOpacity(0);
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
    const colorScale_ = chroma.scale(['white', HEAT_MAP_COLOR]).domain([0, 1]);
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
    const map = document.getElementById('map');
    if (!map) {
      return;
    }

    const bounds = map.getBoundingClientRect();
    const properOpacity =
      hoveredLocation.noLocation || tooltipOverlapsMarkers(dims) ? 0 : 1;
    if (opacity !== properOpacity) {
      setOpacity(properOpacity);
    }
    const left = position(bounds.left, bounds.right, dims.width, x.current);
    const top = position(bounds.top, bounds.bottom, dims.height, y.current);

    const zipsValue = hoveredLocation.properties[valueKey];
    const zipCode = hoveredLocation.properties.name;

    return (
      <div
        id="map-tooltip"
        style={{
          opacity,
          top,
          left,
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
      <Grid container id="map">
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
          {...viewport}
          onViewportChange={viewport => setViewport(viewport)}
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
          {mapMarkers(markerSelection, selectedMarker, colorAssociation)}
          {selectedMarker.map((selected: MarkerFeatures) => {
            return Popups(selected, selectedMarker, dispatch);
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
