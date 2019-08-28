import React, { useState } from 'react';
import { withDataLayer } from 'infrastructure-components';
import { ARTICLE_ENTRY_ID } from "./article-entry";
import { Query } from 'react-apollo';
import Article from './article';

interface IAddArticlesProps {
    getEntryScanQuery: any, // attached through withDataLayer
};

function ListArticles (props: IAddArticlesProps)  {

    return <div>
        <Query {...props.getEntryScanQuery(ARTICLE_ENTRY_ID, {})} >{
            ({loading, data, error}) => {
                if (loading) {
                    return <div>...Loading articles...</div>;
                }

                if (data) {
                    return <div>{
                        data[`scan_${ARTICLE_ENTRY_ID}`].map((article, idx) => <div key={`article_${idx}`}>
                            <Article {...article} />
                        </div>)
                    }</div>
                }

                return <div>Error</div>
            }
        }</Query>
    </div>
};

export default withDataLayer(ListArticles);