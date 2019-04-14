import React from 'react';

import {FormPage, FormMainBlock, FormInput} from './styles/formstyles';

const CreateEntry = props => {
    return (
        <FormPage>
            <FormMainBlock method='POST' action='/entries' >
            <h2>Create An Entry</h2>
            <FormInput>
                <label for="title">Title</label>
                <input name="title" type="text" required/>
            </FormInput>
            <FormInput>
                <label for="entry">Entry</label>
                <textarea name="entry" placeholder="Your entry here" required/>
            </FormInput>
            <button name="submit" type="submit">Submit</button>

            </FormMainBlock>
        </FormPage>
    )
}

export default CreateEntry;