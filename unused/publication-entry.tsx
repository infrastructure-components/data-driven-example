import React from 'react';
import { Entry } from "infrastructure-components";

export const PUBLICATION_ENTRY_ID = "publication";

export const ALL_PUBLICATIONS_KEY = "allkey";

export const toPublication = (data) => {
    return Object.assign({
        allkey: "all"
    }, data)
};


export interface IPublicationEntry {
    const: string,
    name: string,
}

export default function PublicationEntry (props)  {
    return <Entry
        id={ PUBLICATION_ENTRY_ID }
        primaryKey="allkey"
        rangeKey="name"
        data={{

        }}
    />

};