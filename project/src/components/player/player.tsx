import { MouseEvent, useRef, useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchFilmAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { connect, ConnectedProps, useStore } from 'react-redux';
import { State } from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps = ({ currentFilm, isFilmLoaded }: State) => ({
  currentFilm,
  isFilmLoaded,
});

const PROGRESS_MULTIPLIER = 100;

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Player(props: PropsFromRedux): JSX.Element {
  const { currentFilm, isFilmLoaded } = props;
  const store = useStore();
  // eslint-disable-next-line
  const { id }: any = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useCallback((node) => {
    if (node !== null) {
      node.click();
    }
  }, []);
  const [playing, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchFilmAction(Number(id)));
  }, [id, store.dispatch]);
  const history = useHistory();
  // eslint-disable-next-line
  const handleProgress = (evt: any) => {
    if (isNaN(Number(evt.target?.duration))) {
      return;
    }
    const duration = Number(evt.target?.duration);
    const currentTime = Number(evt.target?.currentTime);
    setProgress((currentTime / duration) * PROGRESS_MULTIPLIER);
    setTime(duration - currentTime);
  };
  if (!isFilmLoaded) {
    return <LoadingScreen />;
  }

  const onPlayClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!playing) {
      videoRef.current?.play();
      setIsPlaying(true);
      const icon = evt.currentTarget.querySelector('use');
      if (icon !== null) {
        icon.setAttribute('xlink:href', '#pause');
      }
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
      const icon = evt.currentTarget.querySelector('use');
      if (icon !== null) {
        icon.setAttribute('xlink:href', '#play-s');
      }
    }
  };
  const onExitClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    history.goBack();
  };
  const onFullScreenClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    videoRef.current?.requestFullscreen();
  };
  const convertTime = (totalSeconds: string): string => {
    const secondsNumber = parseInt(totalSeconds, 10);
    const hours = Math.floor(secondsNumber / 3600);
    const minutes = Math.floor(secondsNumber / 60) % 60;
    const seconds = secondsNumber % 60;
    if (hours === 0) {
      return [minutes, seconds]
        .map((number) => number < 10 ? `0${number}` : number)
        .filter((number, i) => number !== '0' || i > 0)
        .join(':');
    } else {
      return [hours, minutes, seconds]
        .map((number) => number < 10 ? `0${number}` : number)
        .filter((number, i) => number !== '0' || i > 0)
        .join(':');
    }
  };
  return (
    <div className="player">
      <video src={currentFilm.videoLink} className="player__video" poster={currentFilm.posterImage} ref={videoRef} onProgress={handleProgress}></video>

      <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{ left: `${progress}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">-{convertTime(String(time))}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayClick} ref={buttonRef}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={onFullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Player };
export default connector(Player);
