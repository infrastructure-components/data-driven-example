import React, { useState } from 'react';

import { withDataLayer } from 'infrastructure-components';
import { useQuery } from '@apollo/react-hooks';
import { ARTICLE_ENTRY_ID } from "./article-entry";


interface IAddArticleProps {
    createQuery: any, // attached through withDataLayer
    getEntryScanQuery: any, // passed through withDataLayer,
}

function TagSelector (props: IAddArticleProps)  {

    const { loading, error, data } = props.createQuery(
        useQuery,
        props.getEntryScanQuery(ARTICLE_ENTRY_ID, {
            //articleid: ["0", "z"]
        })
    );

    console.log(loading, error, data );


    return (loading && <div>loading publications...</div>) ||
        (error && <div>{error}</div>) ||
        <div>
            <select>
                {
                    data[`scan_${ARTICLE_ENTRY_ID}`].map((pub,idx) => (
                        <option key={`pub_${idx}`} value={pub.name}>{pub.name}</option>
                    ))
                }
            </select>
        </div>
};

export default withDataLayer(TagSelector);