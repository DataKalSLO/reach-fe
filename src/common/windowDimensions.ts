// Copied from QoP's answer on this Stack Overflow post: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
// Connect this to your components using:
// const { height, width } = useWindowDimensions();

import { useState, useEffect } from 'react';

function getWindowDimensions(): { width: number; height: number } {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
