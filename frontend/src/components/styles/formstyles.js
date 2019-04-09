import styled from 'styled-components';


//Used to group labels and their inputs, and give them a consistent style

const FormPage = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;

const FormMainBlock = styled.form`
    grid-column: 2 / span 1;
    text-align: center;
    h2{
        width:80%;
        margin: auto;
        text-align:center;
    }
    button{
        margin: auto;
    }
`;

const FormInput = styled.div`
    display:flex;
    flex-direction: row;
    margin: 10px 0px;
    label {
        width: 100px;
        order: 0;
        text-align: right;
        padding: 0px 5px;
    }
    input {
        height: 1.5rem;
        flex: 1;
    }
    textarea{
        height: 50vmin;
        overflow-y: scroll;
        flex: 1;
    }
`;

export {FormInput, FormPage, FormMainBlock};