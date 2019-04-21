import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ErrorBox = styled.div`
  border: 1px solid red;
  background: rgb(230, 15, 15);
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
`;

const ErrorExit = styled.button`
  background: inherit;
  border: none;
  color: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
`;

const ErrorText = styled.p`
  margin-left: 10px;
`;

let SetErrors;

const removeError = (errorIndex, errors, setErrors) => {
  const newErrors = errors.filter((item, index) => index !== errorIndex);
  setErrors(newErrors);
};

const DisplayError = props => {
  const [errors, setErrors] = useState(null);
  SetErrors = setErrors;
  if (errors && errors[0]) {
    let errorMsgs = errors;
    // TODO: Normalize errors returned from the server so this isn't necessary
    if (errors[0].msg) {
      errorMsgs = errors.map(err => err.msg);
    }
    return (
      <div>
        {errorMsgs.map((error, index) => (
          <ErrorBox key={index}>
            <ErrorText>{error}</ErrorText>
            <ErrorExit onClick={() => removeError(index, errors, setErrors)}>
              X
            </ErrorExit>
          </ErrorBox>
        ))}
      </div>
    );
  }
  return <div />;
};

export default DisplayError;
export { SetErrors };
