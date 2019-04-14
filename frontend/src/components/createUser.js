import React from 'react';

import {FormPage, FormMainBlock, FormInput} from './styles/formstyles';

const CreateUser = props => {
    return (
        <FormPage>
            <FormMainBlock method='POST' action='/users' >
            <h2>Create An Entry</h2>
            <FormInput>
                <label for="email">Email</label>
                <input name="email" type="text" required/>
            </FormInput>
            <FormInput>
                <label for="password">Password</label>
                <input name="password" type="password" required/>
            </FormInput>
            <FormInput>
                <label for="repeatPassword">Repeat Password</label>
                <input name="repeatPassword" type="password" required/>
            </FormInput>
            <FormInput>
                <label for="firstName">First Name</label>
                <input name="firstName" type="text" required/>
            </FormInput>
            <FormInput>
                <label for="lastName">Last Name</label>
                <input name="lastName" type="text" required/>
            </FormInput>
            <button name="submit" type="submit">Submit</button>

            </FormMainBlock>
        </FormPage>
    )
}

export default CreateUser;