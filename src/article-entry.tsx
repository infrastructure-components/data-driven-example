import React from 'react';
import { Entry } from "infrastructure-components";
import { GraphQLString }  from 'graphql';

export const ARTICLE_ENTRY_ID = "article";

export interface IArticleEntry {
    articleid: string,
    title: string,
    articlelink: string
}

export default function ArticleEntry (props)  {
    return <Entry
        id={ ARTICLE_ENTRY_ID }
        primaryKey="articleid"
        rangeKey="title"
        data={{
            articlelink: GraphQLString,
        }}
    />
};