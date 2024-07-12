// src/analytics.js
import ReactGA from 'react-ga';

const trackingId = "G-EPJP95785S"; // Replace with your tracking ID
ReactGA.initialize(trackingId);

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
