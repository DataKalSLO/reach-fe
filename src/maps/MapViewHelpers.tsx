import chroma from 'chroma-js';
import { zip } from 'lodash';
import React from 'react';

// TODO: Had trouble creating an interface for featureCollection
// Tried to create an interface using the type from features on line 34
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prepGeo(featureCollection: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prepped: any = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  featureCollection.forEach((feature: any) => {
    prepped.push({
      geometry: feature.geometry,
      ...feature.properties
    });
  });
  return prepped;
}

// TODO: going to solve "any" errors at a later time, ignoring for demo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStat(features: any, extractionFunc: any, selection: string) {
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stat = extractionFunc(features, (o: any) => {
    return o.properties[selection];
  });
  return stat.properties[selection];
}

export function onHover(
  defaultHoveredLocation: {
    properties: {
      [x: string]: string;
      ZIP_TABULATION: string;
    };
    noLocation: boolean;
  },
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setHoveredLocation: any,
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any,
  x: React.MutableRefObject<number>,
  y: React.MutableRefObject<number>,
  dims: DOMRect,
  setDims: (dims: DOMRect) => void
) {
  const { features, point } = event;
  const hoveredLocation =
    // TODO: going to solve "any" errors at a later time, ignoring for demo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    features && features.find((f: any) => f.layer.id === 'data');
  if (!hoveredLocation) {
    setHoveredLocation(defaultHoveredLocation);
    return;
  }
  x.current = point[0];
  y.current = point[1];
  const tooltipDiv = document.getElementById('map-tooltip');
  if (!tooltipDiv) {
    return;
  }
  const newDims = tooltipDiv.getBoundingClientRect();
  if (JSON.stringify(dims) !== JSON.stringify(newDims)) {
    setDims(newDims);
  }
  setHoveredLocation(hoveredLocation);
}

export function quantileMaker(
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
      // TODO: going to solve "any" errors at a later time, ignoring for demo
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  return zip(dataScale, chromaScale);
}

// Find optimal anchor point for an element within a container based on cursor position.
export function position(
  containerLowerBound: number,
  containerUpperBound: number,
  elementLength: number,
  cursor: number
) {
  const mid = (containerUpperBound - containerLowerBound) / 2;
  const inLowerHalf = cursor < mid;
  return inLowerHalf ? cursor : cursor - elementLength;
}

function getPopupBounds() {
  const popups = document.getElementsByClassName('mapboxgl-popup-content');
  const popupsArr = Array.from(popups);
  return popupsArr.map(popup => popup.getBoundingClientRect());
}

function rectsOverlap(r1: DOMRect, r2: DOMRect) {
  return !(
    r1.left >= r2.right ||
    r2.left >= r1.right ||
    r1.top >= r2.bottom ||
    r2.top >= r1.bottom
  );
}

export function tooltipOverlapsMarkers(tooltipBounds: DOMRect) {
  const popupBounds = getPopupBounds();
  return popupBounds.some(bounds => rectsOverlap(tooltipBounds, bounds));
}

export function cursorWithinBounds(x: number, y: number, bounds: DOMRect) {
  return (
    x >= bounds.right &&
    x <= bounds.left &&
    y >= bounds.top &&
    y <= bounds.bottom
  );
}
