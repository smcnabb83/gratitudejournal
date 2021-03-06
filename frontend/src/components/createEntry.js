import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Markdown from 'react-remarkable';
import { SetErrors } from './errorDisplay';
import UserContext from './context/UserContext';

import {
  FormPage,
  FormMainBlock,
  FormInput,
  EditPreview,
} from './styles/formstyles';

const onSubmit = (event, eventData, setIsSubmitted, setIsLoginError) => {
  event.preventDefault();
  Axios.post('/entries', eventData)
    .then(e => {
      if (e.response && !e.response.data.errors) setIsSubmitted(true);
    })
    .catch(e => {
      SetErrors(e.response.data.errors);
      setIsLoginError(e.response && e.response.status === 403);
      setIsSubmitted(false);
    });
};

const CreateEntry = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const User = useContext(UserContext);

  const formData = { title, entry };

  if (isSubmitted) {
    return <Redirect to="/" />;
  }

  if (isLoginError || !User.UserID) {
    return <Redirect to="/logon" />;
  }

  return (
    <FormPage>
      <h2>Create An Entry</h2>
      <FormMainBlock
        editor="yes"
        method="POST"
        action="/entries"
        onSubmit={e => onSubmit(e, formData, setIsSubmitted, setIsLoginError)}
      >
        <FormInput>
          <label htmlFor="title">
            Title
            <input
              name="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <FormInput>
          <label htmlFor="entry">
            Entry
            <textarea
              name="entry"
              placeholder="Your entry here"
              value={entry}
              onChange={e => setEntry(e.target.value)}
              required
            />
          </label>
        </FormInput>
        <button name="submit" type="submit">
          Submit
        </button>
      </FormMainBlock>
      <EditPreview className="Preview">
        <h1 className="title">{title}</h1>
        <Markdown source={entry} />
      </EditPreview>
    </FormPage>
  );
};

export default CreateEntry;
