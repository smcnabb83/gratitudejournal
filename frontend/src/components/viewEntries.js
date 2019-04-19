import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import axios from 'axios';

const ViewLayout = Styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
`;

const EntriesArea = Styled.div`
    display: flex;
    flex-direction: column;
`;

const MainEntryArea = Styled.div`
    background: #efefef;
    margin: 2px;
    cursor: pointer;
`;

const EntryTitle = Styled.h2`
    text-align: center;
`;

const GetSelectedEntryBody = async(entryId, set) => {
    const response = await axios(`/entries/${entryId}`);
    console.log(response);
    set(response.data.entrybody);
}

const EntryTemplate = props => {

    const {entrytitle, entrydate, entryid} = props.entry;
    return(
        <MainEntryArea onClick={() => GetSelectedEntryBody(entryid, props.setEntry)}>
            <EntryTitle>{entrytitle}</EntryTitle>
            <p>{entrydate}</p>
        </MainEntryArea>
    )
}


const ViewEntries = props => {
    const [entries, setEntries] = useState();
    const [currentEntryBody, setCurrentEntryBody] = useState();

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'entries/user'
        );
        console.log(result);
        setEntries(result.data);
        console.log(entries);
        };

        fetchData();
    }, []);

    return(
        <ViewLayout>
            <EntriesArea>
                {entries && entries.map(entry => <EntryTemplate entry={entry} key={entry.entryid} setEntry={setCurrentEntryBody}/>)}
            </EntriesArea>
            <p>
                {currentEntryBody}
            </p>
        </ViewLayout>
    )
}

export default ViewEntries;