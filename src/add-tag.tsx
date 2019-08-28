import React, { useState } from 'react';

import { withDataLayer } from 'infrastructure-components';
import { useMutation } from '@apollo/react-hooks';
import { TAG_ENTRY_ID } from "./tag-entry";

interface IAddTagProps {
    articleid: string, // from parent
    createSetMutation: any, // attached through withDataLayer
}

function AddTag (props: IAddTagProps)  {

    const [tag, setTag] = useState("");

    const addTag = props.createSetMutation(useMutation, TAG_ENTRY_ID, {
        articleid: props.articleid,
        tag: tag
    });

    return <span>
        <div>
            Tag:
            <input value={tag} onChange={event => setTag(event.target.value)}/>
        </div>

        <button onClick={() => addTag({})}>Save</button>

    </span>
};

export default withDataLayer(AddTag);