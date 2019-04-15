import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';

import {FormPage, FormMainBlock, FormInput} from './styles/formstyles';

const onSubmit = (event, eventData, setIsSubmitted) => {

    event.preventDefault();
     Axios.post('/users', eventData).then(setIsSubmitted(true)).catch(e => console.log(e.response.data));

}

const CreateUser = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    const formData = {email, password, repeatPassword, firstName, lastName};

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
            <FormInput>
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input name="repeatPassword" type="password" value={repeatPassword} onChange = {e => setRepeatPassword(e.target.value)} required/>
            </FormInput>
            <FormInput>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" value={firstName} onChange = {e => setFirstName(e.target.value)} required/>
            </FormInput>
            <FormInput>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" value={lastName} onChange = {e => setLastName(e.target.value)} required/>
            </FormInput>
            <button name="submit" type="submit">Submit</button>

            </FormMainBlock>
        </FormPage>
    )
}

export default CreateUser;