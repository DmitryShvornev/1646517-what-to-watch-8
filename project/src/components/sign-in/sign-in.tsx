import { useRef, FormEvent, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { AuthData } from '../../types/auth-data';
import { AppRoute } from '../../const';

const EMAIL_REGULAR_EXPR = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const PASSWORD_REGULAR_EXPR = /[a-z]\d|\d[a-z]/i;

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData, callback : () => void) {
    dispatch(loginAction(authData, callback));
  },
});


const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignIn(props: PropsFromRedux): JSX.Element {
  const { onSubmit } = props;
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const emailValidCondition = EMAIL_REGULAR_EXPR.test(String(loginRef.current.value));
      const passwordValidCondition = PASSWORD_REGULAR_EXPR.test(String(passwordRef.current.value));
      if (emailValidCondition && passwordValidCondition) {
        setIsValid(true);
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        }, () => history.push(AppRoute.Main));
      }
      else {
        setIsValid(false);
      }
    }
  };
  const onLogoClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.replace('/');
  };
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link" onClick={onLogoClick}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__message" style={isValid === true ? { display: 'none' } : {}}>
            <p>Please enter a valid email address and a valid password</p>
          </div>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" ref={loginRef} type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" ref={passwordRef} type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export { SignIn };
export default connector(SignIn);
