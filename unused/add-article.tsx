import React, { useState } from 'react';

import { select, withDataLayer } from 'infrastructure-components';
import { useMutation } from '@apollo/react-hooks';
import uuidv4 from 'uuid/v4';
import { IArticleEntry, ARTICLE_ENTRY_ID } from "./article-entry";


interface IAddArticleProps {
    setEntryMutation: any, // attached through withDataLayer
    createMutation: any, // attached through withDataLayer
    apolloClient: any, // passed through withDataLayer
    getEntryListQuery: any, // passed through withDataLayer,
}

function AddArticle (props: IAddArticleProps)  {

    const [publication, setPublication] = useState("");
    const [articlelink, setArticleLink] = useState("");
    const [imagelink, setImageLink] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    const addArticle = props.createMutation(useMutation, ARTICLE_ENTRY_ID, {
        articleid: uuidv4(),
        publication: publication,
        articlelink: articlelink,
        imagelink: imagelink,
        title: title,
        publicationdate: date,
    });

    return <div>
        <div>
            Publication:
            <input value={publication} onChange={event => setPublication(event.target.value)}/>
        </div>

        <div>
            ArticleLink:
            <input value={articlelink} onChange={event => setArticleLink(event.target.value)}/>
        </div>

        <div>
            ImageLink:
            <input value={imagelink} onChange={event => setImageLink(event.target.value)}/>
        </div>

        <div>
            Title:
            <input value={title} onChange={event => setTitle(event.target.value)}/>
        </div>

        <div>
            Date:
            <input value={date} onChange={event => setDate(event.target.value)}/>
        </div>


        <button onClick={() => addArticle({})}>Save</button>

    </div>
};

export default withDataLayer(AddArticle);