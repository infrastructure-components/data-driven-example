import React, { useState } from 'react';

import { withDataLayer } from 'infrastructure-components';
import { Mutation } from 'react-apollo'
import uuidv4 from 'uuid/v4';
import { IArticleEntry, ARTICLE_ENTRY_ID } from "./article-entry";

interface IAddArticleProps {
    setEntryMutation: any, // attached through withDataLayer
};

function AddArticle (props: IAddArticleProps)  {

    const [articlelink, setArticleLink] = useState("");
    const [title, setTitle] = useState("");

    return <div>
        <div>
            ArticleLink:
            <input value={articlelink} onChange={event => setArticleLink(event.target.value)}/>
        </div>

        <div>
            Title:
            <input value={title} onChange={event => setTitle(event.target.value)}/>
        </div>

        <Mutation {...props.setEntryMutation(ARTICLE_ENTRY_ID, {
            articleid: uuidv4(),
            articlelink: articlelink,
            title: title
        })}>
            {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
    </div>
};

export default withDataLayer(AddArticle);