import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Styled from 'styled-components';
import axios from 'axios';
import Markdown from 'react-remarkable';
import PropTypes from 'proptypes';
import UserContext from './context/UserContext';

const ViewLayout = Styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    overflow:hidden;
    height: 90vh;
`;

const EntriesArea = Styled.div`
    display: flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y: auto;
    height: inherit;
`;

const MainEntryArea = Styled.div`
    background: #efefef;
    margin: 2px;
    cursor: pointer;
`;

const EntryDisplayArea = Styled.div`
    display: flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y: auto;
    height: inherit;
`;

const EntryTitle = Styled.h2`
    text-align: center;
`;

const EntryTime = Styled.h5`
    text-align: center;
`;

const GetSelectedEntryBody = async (entryId, set) => {
  const response = await axios(`/entries/${entryId}`);
  console.log(response);
  set(response.data.entrybody);
};

const EntryTemplate = props => {
  const { entry, setEntry } = props;
  const { entrytitle, entrydate, entryid } = entry;
  return (
    <MainEntryArea onClick={() => GetSelectedEntryBody(entryid, setEntry)}>
      <EntryTitle>{entrytitle}</EntryTitle>
      <EntryTime>{new Date(entrydate).toDateString()}</EntryTime>
    </MainEntryArea>
  );
};

const ViewEntries = () => {
  const [entries, setEntries] = useState();
  const [currentEntryBody, setCurrentEntryBody] = useState();
  const User = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('entries/user');
      console.log(result);
      setEntries(result.data);
      console.log(entries);
    };

    fetchData();
  }, []);
  if (!User.UserID) {
    return <Redirect to="/logon" />;
  }
  return (
    <ViewLayout>
      <EntriesArea>
        {entries &&
          entries
            .sort(
              (entry, entry2) =>
                new Date(entry2.entrydate) - new Date(entry.entrydate)
            )
            .map(entry => (
              <EntryTemplate
                entry={entry}
                key={entry.entryid}
                setEntry={setCurrentEntryBody}
              />
            ))}
      </EntriesArea>
      <EntryDisplayArea>
        <Markdown source={currentEntryBody} />
      </EntryDisplayArea>
    </ViewLayout>
  );
};

EntryTemplate.propTypes = {
  entry: PropTypes.shape({
    entrydate: PropTypes.string,
    entryid: PropTypes.string,
    entrytitle: PropTypes.string,
  }).isRequired,
  setEntry: PropTypes.func.isRequired,
};

export default ViewEntries;
