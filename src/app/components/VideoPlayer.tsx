"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-ads/dist/videojs.ads.css";
import "videojs-ima/dist/videojs.ima.css";

if (typeof window !== "undefined") {
  require("videojs-contrib-ads");
  require("videojs-ima");
}

interface VideoPlayerProps {
  currentVideo: string;
  adTagUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentVideo, adTagUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let player: videojs.Player | null = null;

    const initializePlayer = () => {
      if (videoRef.current) {
        player = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: "auto",
          fluid: true,
          liveui: true,
          techOrder: ["html5"],
          html5: {
            vhs: {
              withCredentials: true
            },
            sources: [{
              src: currentVideo || 'https://hls.tvpunjab.com/stream/deb10bae362f810630ec3abedcae5894.sdp/playlist.m3u8',
              type: "application/x-mpegURL",
            }],
          }
        });

        const options = {
          id: "content_video",
          adTagUrl,
          adsRenderingSettings: {
            enablePreloading: true,
          },
        };

        player.ima(options);

        const startEvent = /iPhone|iPad|Android/i.test(navigator.userAgent)
          ? "touchend"
          : "click";

        player.one(startEvent, () => {
          player?.ima.initializeAdDisplayContainer();
        });
      }
    };

    const script = document.createElement("script");
    script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
    script.async = true;
    script.onload = initializePlayer;
    document.body.appendChild(script);

    return () => {
      if (player) {
        player.dispose();
      }
      document.body.removeChild(script);
    };
  }, [currentVideo, adTagUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        id="content_video"
        className="video-js vjs-default-skin"
        data-setup="{}"
      >
        <source src={currentVideo} type="application/x-mpegURL" />
      </video>
    </div>
  );
};

export default VideoPlayer;