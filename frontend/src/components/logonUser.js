import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { SetErrors } from './errorDisplay';
import UserContext from './context/UserContext';

import { FormPage, FormMainBlock, FormInput } from './styles/formstyles';

const onSubmit = (event, eventData, setIsSubmitted, UserCtx) => {
  event.preventDefault();
  Axios.post('/users/logon', eventData)
    .then(e => {
      if (e.response && e.response.data.errors) {
        SetErrors(e.response.data.errors);
      } else {
        UserCtx.SetUserID('User');
        setIsSubmitted(true);
      }
    })
    .catch(e => {
      console.log(e);
      SetErrors(e.response.data.errors);
      setIsSubmitted(false);
    });
};

const LogonUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const User = useContext(UserContext);

  const formData = { username: email, password };

  if (isSubmitted) {
    SetErrors(null);
    return <Redirect to="/" />;
  }

  return (
    <FormPage>
      <FormMainBlock
        onSubmit={e => onSubmit(e, formData, setIsSubmitted, User)}
      >
        <h2>Log In</h2>
        <FormInput>
          <label htmlFor="email">
            <span>Email</span>
            <input
              name="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <FormInput>
          <label htmlFor="password">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <button name="submit" type="submit">
          Log In
        </button>
      </FormMainBlock>
    </FormPage>
  );
};

export default LogonUser;
