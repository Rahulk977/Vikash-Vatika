
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="bg-primary/80 text-white p-4 rounded-full hover:bg-primary transition-colors"
          >
            <Play className="h-8 w-8" />
          </button>
        )}
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <button 
            onClick={togglePlay}
            className="text-white hover:text-primary transition-colors"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          
          <button 
            onClick={toggleMute}
            className="text-white hover:text-primary transition-colors"
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
