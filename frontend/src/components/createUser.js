import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { SetErrors } from './errorDisplay';

import { FormPage, FormMainBlock, FormInput } from './styles/formstyles';

const onSubmit = (event, eventData, setIsSubmitted) => {
  event.preventDefault();
  Axios.post('/users', eventData)
    .then(e => {
      if (!e.response.data.errors) setIsSubmitted(true);
    })
    .catch(e => {
      SetErrors(e.response.data.errors);
      setIsSubmitted(false);
    });
};

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formData = { email, password, repeatPassword, firstName, lastName };

  if (isSubmitted) {
    return <Redirect to="/" />;
  }

  return (
    <FormPage>
      <FormMainBlock onSubmit={e => onSubmit(e, formData, setIsSubmitted)}>
        <h2>Sign up</h2>
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
        <FormInput>
          <label htmlFor="repeatPassword">
            <span>Repeat Password</span>
            <input
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <FormInput>
          <label htmlFor="firstName">
            <span>First Name</span>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <FormInput>
          <label htmlFor="lastName">
            <span>Last Name</span>
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <button name="submit" type="submit">
          Submit
        </button>
      </FormMainBlock>
    </FormPage>
  );
};

export default CreateUser;
