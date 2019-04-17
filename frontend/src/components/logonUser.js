import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import {SetErrors} from './errorDisplay';

import {FormPage, FormMainBlock, FormInput} from './styles/formstyles';

const onSubmit = (event, eventData, setIsSubmitted) => {

    event.preventDefault();
     Axios.post('/users/logon', eventData).then((e) => {if(!e.response.data.errors) setIsSubmitted(true);}).catch(e => {SetErrors(e.response.data.errors); setIsSubmitted(false)});

}

const LogonUser = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formData = {username:email, password};

    if(isSubmitted){
        return <Redirect to='/' />;
    }

    return (
        <FormPage>
            <FormMainBlock onSubmit={e => onSubmit(e, formData, setIsSubmitted)} >
            <h2>Sign up</h2>
            <FormInput>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" value={email} onChange = {e => setEmail(e.target.value)} required/>
            </FormInput>
            <FormInput>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" value={password} onChange = {e => setPassword(e.target.value)} required/>
            </FormInput>
            <button name="submit" type="submit">Log In</button>

            </FormMainBlock>
        </FormPage>
    )
}

export default LogonUser;