import React, { useState } from 'react';

import { select, withDataLayer } from 'infrastructure-components';
import { useQuery } from '@apollo/react-hooks';
import { IArticleEntry, ARTICLE_ENTRY_ID } from "./article-entry";
import { Query } from "react-apollo";


interface IAddArticleProps {
    setEntryMutation: any, // attached through withDataLayer
    createMutation: any, // attached through withDataLayer
    apolloClient: any, // passed through withDataLayer
    getEntryListQuery: any, // passed through withDataLayer,
}

function ListArticlesOfPublication (props: IAddArticleProps)  {

    /*const { loading, error, data } = useQuery(GET_GREETING, {
        variables: { language: 'english' },
    });


    const addArticle = props.createMutation(useMutation, ARTICLE_ENTRY_ID, {
        articleid: uuidv4(),
        publication: publication,
        articlelink: articlelink,
        imagelink: imagelink,
        title: title,
        publicationdate: date,
    });


    const { mutation, context } = props.setEntryMutation(ARTICLE_ENTRY_ID, {
        articleid: uuidv4(),
        publication: publication,
        articlelink: articlelink,
        imagelink: imagelink,
        title: title,
        publicationdate: date,
    });

    const [addArticle, { data }] = useMutation(mutation, {
        context: context,
        client: props.apolloClient
    });

    const addArticle = props.createMutation(useMutation, ARTICLE_ENTRY_ID, {
        articleid: uuidv4(),
        publication: publication,
        articlelink: articlelink,
        imagelink: imagelink,
        title: title,
        publicationdate: date,
    });*/

    return <div>
        {/*if (loading)
            return <p>Loading ...</p>;
            return <h1>Hello {data.greeting.message}!</h1>;*/}

        <Query {...props.getEntryListQuery(ARTICLE_ENTRY_ID, {
            publication: "a"
        })} >{

            (query) => {
                if (query.loading) {
                    return <div>...Loading url...</div>;
                }

                if (query.data) {
                    console.log("data: ", query.data);
                    return <div>data</div>
                }

                console.log("error: ", query);
                return <div>Error</div>
            }
        }</Query>


    </div>
};

export default withDataLayer(ListArticlesOfPublication);