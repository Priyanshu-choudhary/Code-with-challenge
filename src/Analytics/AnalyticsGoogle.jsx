/**
 * Google Analytics 4 integration.
 * Migrated from deprecated react-ga → react-ga4.
 */
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-EPJP95785S';

let initialised = false;

function init() {
  if (initialised) return;
  ReactGA.initialize(TRACKING_ID);
  initialised = true;
}

export const logPageView = () => {
  init();
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export default { logPageView };
