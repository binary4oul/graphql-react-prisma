import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });
  const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
    }
  `;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    }
  });
  
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    }
  });

  const loggedIn = formState.login

  return (
    <>
      <h4 className="mv3">{loggedIn ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!loggedIn && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={ () => loggedIn ? login() : signup()}
        >
          {loggedIn ? "login" : "create account"}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !loggedIn,
            })
          }
        >
          {loggedIn
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </>
  );
};

export default Login;
