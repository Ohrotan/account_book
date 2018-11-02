import React, {Component} from 'react';
import {Button, Icon, Label} from 'semantic-ui-react';
import {auth, google} from './firebase';

const Login = ({onLogin}) => {
  const handleClick = () => {
    const provider = google();
    auth.signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        onLogin();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage);
      })
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        height: '48px',
        color: 'red',
        fontSize: '24px',
        lineHeight: '48px',
        marginBottom: '20px',
      }}>
        Welcome to QP Account Manager
      </div>
      <Button as="div" labelPosition="right" onClick={handleClick}>
        <Button color="red">
          Login with &nbsp;&nbsp;&nbsp;
          <Icon name="heart"/>
        </Button>
        <Label as="a" basic color="red" pointing="left">
          Google
        </Label>
      </Button>
    </div>
  )
};

export default Login;