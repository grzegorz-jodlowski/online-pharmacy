import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import styles from './LoginPage.module.scss';

import { Title } from '../../common/Title/Title';
import { Info } from '../../common/Info/Info';

import { connect } from 'react-redux';
import { updateLoginStatus } from '../../../redux/loginRedux';

const Component = ({ className, children, isLogged, updateLoginStatus }) => {

  const loginSuccess = (response) => {
    console.log(response);
    console.log('Zalogowano');
    updateLoginStatus('login');

  };
  const loginError = (response) => {
    console.log(response);
    console.log('Nie udało się zalogować');

  };
  const logout = (response) => {
    console.log('Wylogowano');
    updateLoginStatus('logout');

  };

  return (
    <main className={clsx(className, styles.root, 'container')}>
      {isLogged ?
        <div>
          <Info variant={'success'} >Jesteś zalogowany</Info>
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={clsx(styles.loginBtn, styles.loginBtnGoogle)}>Kliknij żeby wylogować</button>
            )}
            buttonText="Logout"
            onLogoutSuccess={logout}
          // isSignedIn={false}
          >
          </GoogleLogout>
        </div>
        :
        <div>
          <Title>Zaloguj się żeby uzyskać dostęp do swoich kursów</Title>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={clsx(styles.loginBtn, styles.loginBtnGoogle)}>Zaloguj się z Google</button>
            )}
            buttonText="Login"
            onSuccess={loginSuccess}
            onFailure={loginError}
            cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
          />


        </div>
      }
    </main>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLogged: PropTypes.bool,
  updateLoginStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  isLogged: state.isLogged,
});

const mapDispatchToProps = dispatch => ({
  updateLoginStatus: log => dispatch(updateLoginStatus(log)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as LoginPage,
  Container as LoginPage,
  Component as LoginPageComponent, //for tests
};

