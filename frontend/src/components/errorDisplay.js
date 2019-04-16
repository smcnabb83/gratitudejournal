import React, {useState} from 'react';
import styled from 'styled-components';

const ErrorBox = styled.div`
    border: 1px solid red;
    background: rgb(230, 15, 15);
    border-radius: 10px;
    margin: 10px;
    text-align: center;
`;

let SetErrors;

const DisplayError = props => {
    const[errors, setErrors] = useState(null);
    SetErrors = setErrors;
    if(errors){
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
                </ErrorBox>
            ))}
        </div>
    )
        }
        return <div></div>
}

export default DisplayError;
export {SetErrors};