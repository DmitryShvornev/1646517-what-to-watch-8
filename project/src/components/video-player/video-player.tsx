import { useState, useEffect, useRef} from 'react';

type Props = {
  autoPlay: boolean;
  src: string;
  poster: string;
}

function VideoPlayer({autoPlay, src, poster}:Props) : JSX.Element {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);
  return (<video src={src} ref={videoRef} className="player__video" poster={poster} onMouseEnter={() => setIsPlaying(!isPlaying)} ></video>);
}

export default VideoPlayer;
