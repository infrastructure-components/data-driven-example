import React from 'react';
import AddTag from './add-tag';
import { useQuery } from '@apollo/react-hooks';
import { withDataLayer } from 'infrastructure-components';
import {TAG_ENTRY_ID} from "./tag-entry";

interface IArticleProps {
    articleid: string,
    title: string,
    articlelink: string,
    createQuery: any, // attached through withDataLayer
    getEntryListQuery: any, // passed through withDataLayer,
};

function Article (props: IArticleProps)  {


    const { loading, error, data } = props.createQuery(
        useQuery,
        props.getEntryListQuery(TAG_ENTRY_ID, {
            articleid: props.articleid
        })
    );

    return <div>
        <a href={props.articleLink} target="_blank">{props.title}</a>
        <AddTag articleid={props.articleid}/>
        {

            (loading && <span>loading tags...</span>) ||
            (error && <span>error loading tags!</span>) ||
            data[`list_${TAG_ENTRY_ID}_articleid`].map((item,idx) => (
                <span key={`tag_${idx}`} >{item.tag}</span>
            ))
        }
    </div>
};

export default withDataLayer(Article);
