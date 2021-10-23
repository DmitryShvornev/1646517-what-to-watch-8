import { useRef } from 'react';

type Props = {
  play: boolean;
  src: string;
  poster: string;
}

function VideoPlayer({ play, src, poster }: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  if (videoRef.current) {
    if (play) {
      setTimeout(() => videoRef.current?.play(), 1000);
    } else {
      videoRef.current.pause();
    }
  }
  return (
    <video ref={videoRef} className="player__video" poster={poster} onPause={() => videoRef.current?.load()} muted>
      <source src={src}></source>
    </video>);
}

export default VideoPlayer;
