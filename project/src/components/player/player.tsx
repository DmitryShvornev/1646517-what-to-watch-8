import { MouseEvent, useRef, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {fetchFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import { connect, ConnectedProps, useStore } from 'react-redux';
import {State} from '../../types/state';

const mapStateToProps = ({currentFilm}: State) => ({
  currentFilm,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Player(props : PropsFromRedux) : JSX.Element {
  const {currentFilm} = props;
  const store = useStore();
  // eslint-disable-next-line
  const {id} : any = useParams();
  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchFilmAction(Number(id)));
  }, [id, store.dispatch]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const history = useHistory();
  const [playing, setIsPlaying] = useState(false);
  const onPlayClick = (evt : MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!playing) {
      videoRef.current?.play();
      setIsPlaying(true);
      const icon =  evt.currentTarget.querySelector('use');
      if (icon !== null) {
        icon.setAttribute('xlink:href','#pause');
      }
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
      const icon =  evt.currentTarget.querySelector('use');
      if (icon !== null) {
        icon.setAttribute('xlink:href','#play-s');
      }
    }
  };
  const onExitClick = (evt : MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    history.goBack();
  };
  const onFullScreenClick = (evt : MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    videoRef.current?.requestFullscreen();
  };
  return (
    <div className="player">
      <video src={currentFilm.videoLink} className="player__video" poster={currentFilm.posterImage} ref={videoRef}></video>

      <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{left: '0%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{`${Math.floor(currentFilm.runTime / 60)}:${currentFilm.runTime % 60}`}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayClick}>
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

export {Player };
export default connector(Player);
