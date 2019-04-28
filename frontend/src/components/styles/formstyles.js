import styled from 'styled-components';

// Used to group labels and their inputs, and give them a consistent style

const FormPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  grid-template-rows: 70px 1fr;
  border: 1px solid gray;
  border-radius: 5%;
  box-shadow: 3px 5px darkslategray;
  margin: 0px 20px;

  h2 {
    grid-row: 1 / span 1;
    grid-column: 2 / span 2;
    text-align: center;
    border-bottom: 1px solid darkgray;
  }
`;

const FormMainBlock = styled.form`
  grid-column: 2 / span ${props => (props.editor ? '1' : '2')};
  grid-row: 2 / 3;
  text-align: center;

  h2 {
    width: 80%;
    margin: auto;
    text-align: center;
    border-bottom: 1px solid darkgray;
  }
  button {
    margin: auto;
  }
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
  label {
    display: flex;
    flex-direction: row;
    order: 0;
    text-align: right;
    width: 100%;
    span {
      width: 100px;

      padding: 0px 5px;
      margin: 0px 10px;
    }
    input {
      height: 1.5rem;
      flex-grow: 1;
    }
    textarea {
      height: 50vmin;
      overflow-y: scroll;
      width: 50vmin;
      flex: 1;
    }
  }
`;

const EditPreview = styled.div`
  grid-row: 2 / span 1;
  grid-column: 3 / span 1;
  border: 2px solid black;
  margin-left: 10px;
  margin-bottom: 30px;

  h1 .title {
    text-align: center;
  }

  h2 {
    border-bottom: none;
    text-align: left;
  }
`;

export { FormInput, FormPage, FormMainBlock, EditPreview };
