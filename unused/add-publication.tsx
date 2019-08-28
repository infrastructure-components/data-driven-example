import React, { useState } from 'react';

import { withDataLayer } from 'infrastructure-components';
import { Mutation } from 'react-apollo'
import { PUBLICATION_ENTRY_ID, toPublication } from "./publication-entry";


interface IAddPublicationProps {
    setEntryMutation: any, // attached through withDataLayer
    apolloClient: any, // passed through withDataLayer
}

function AddPublication (props: IAddPublicationProps)  {

    const [publication, setPublication] = useState("");

    return <div>
        <div>
            Publication:
            <input value={publication} onChange={event => setPublication(event.target.value)}/>
        </div>

        <Mutation {...props.setEntryMutation(PUBLICATION_ENTRY_ID, toPublication({name: publication}))}>

            {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>

    </div>
};

export default withDataLayer(AddPublication);