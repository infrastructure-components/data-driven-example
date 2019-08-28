import React from 'react';
import { Entry } from "infrastructure-components";
import { GraphQLString }  from 'graphql';

export const TAG_ENTRY_ID = "tag";

export interface ITagEntry {
    articleid: string,
    tag: string,
}

export default function TagEntry (props)  {
    return <Entry
        id={ TAG_ENTRY_ID }
        primaryKey="articleid"
        rangeKey="tag"
        data={{

        }}
    />

};