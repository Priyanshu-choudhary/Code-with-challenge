import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ url }) => {
  const getYouTubeVideoId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  };

  const videoId = getYouTubeVideoId(url);

  const opts = {
    height: '250',
    width: '450',
    playerVars: {
      autoplay: 0, // Autoplay the video
    },
  };

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YouTubePlayer;
