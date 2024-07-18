import React, { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import { Alert, Snackbar } from '@mui/material';

const SecurityChecks = () => {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    // Fullscreen Mode using screenfull
    const enterFullscreen = () => {
      if (screenfull.isEnabled) {
        screenfull.request();
      }
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        setAlertOpen(true);
        enterFullscreen();
      }
    };

    screenfull.on('change', handleFullscreenChange);

    // Check every second if the user is in fullscreen mode
    const intervalId = setInterval(() => {
      if (screenfull.isEnabled && !screenfull.isFullscreen) {
        setAlertOpen(true);
        enterFullscreen();
      }
    }, 1000); // Check every second

    // Prevent Tab/Window Switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAlertOpen(true);
        enterFullscreen();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Prevent Page Reload/Refresh
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Block Inspect Element
    const blockInspect = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74))) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', blockInspect);

    // Disable Right-Click
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      // Cleanup event listeners
      clearInterval(intervalId);
      screenfull.off('change', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', blockInspect);
      document.removeEventListener('contextmenu', disableRightClick);
      if (screenfull.isEnabled) {
        screenfull.exit();
      }
    };
  }, []);

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={2000}
      onClose={() => setAlertOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => setAlertOpen(false)} severity="warning">
        You must remain in fullscreen mode during the test.
      </Alert>
    </Snackbar>
  );
};

export default SecurityChecks;
