import { forwardRef, ForwardedRef } from 'react';

type Props = {
  src: string;
  poster: string;
}

function Player({ src, poster }: Props, ref: ForwardedRef<HTMLVideoElement>): JSX.Element {
  return (
    <video className="player__video" ref={ref} poster={poster} muted>
      <source src={src}></source>
    </video>);
}

const VideoPlayer = forwardRef(Player);
export default VideoPlayer;
