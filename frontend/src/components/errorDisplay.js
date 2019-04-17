import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ErrorBox = styled.div`
    border: 1px solid red;
    background: rgb(230, 15, 15);
    border-radius: 10px;
    margin: 10px;
    text-align: center;
`;

let SetErrors;

const removeError = (errorIndex, errors, setErrors) => {
    const newErrors = errors.filter((item, index) => index !== errorIndex);
    setErrors(newErrors);
}

const DisplayError = props => {

    const[errors, setErrors] = useState(null);
    SetErrors = setErrors;
    if(errors && errors[0]){
        let errorMsgs = errors;
        //TODO: Normalize errors returned from the server so this isn't necessary
        if(errors[0].msg){
        errorMsgs = errors.map(err => err.msg);
        }
    return(
        <div>
            {errorMsgs.map((error, index) => (
                <ErrorBox key={index}>
                    <p>{error}</p>
                    <button onClick={() => removeError(index, errors, setErrors)}>X</button>
                </ErrorBox>
            ))}
        </div>
    )
        }
        return <div></div>
}

export default DisplayError;
export {SetErrors};