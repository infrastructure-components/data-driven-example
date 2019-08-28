import * as React from 'react';

import {
    callService,
    Middleware,
    select,
    Service,
    serviceWithDataLayer
} from "infrastructure-components";

import { IArticleEntry, ARTICLE_ENTRY_ID} from './article-entry';
import { TAG_ENTRY_ID } from './tag-entry';

export const ARTICLES_WITH_TAG_SERVICE_ID = "getallarticles";

export async function callGetUserService (tag: string, onData: (articles: Array<IArticleEntry>) => void) {

    await callService(
        ARTICLES_WITH_TAG_SERVICE_ID,
        {
            tag: tag,
        },
        async function (response: any) {
            console.log("received data: ", response);

            await response.json().then(function(data: Array<IArticleEntry>) {
               onData(data)
            });
        },
        (error) => {
            console.log("error: " , error)
        }
    );

}

export default function ArticlesWithTagService () {
    return <Service
        id={ ARTICLES_WITH_TAG_SERVICE_ID }
        path="/articleswithtag"
        method="GET">

        <Middleware
            callback={serviceWithDataLayer(async function (dataLayer, req, res, next) {

                //console.log("this is the service: ", req.query);

                const data = await select(
                    dataLayer.client,
                    dataLayer.getEntryListQuery(TAG_ENTRY_ID, {
                        tag: req.query.tag,
                    })
                );

                const result =  await Promise.all(data.map(async tagEntry => {
                    const article = await select(
                        dataLayer.client,
                        dataLayer.getEntryListQuery(TAG_ENTRY_ID, {
                            tag: req.query.tag,
                        })
                    )

                    return article;
                }));


                console.log(data[`get_${USER_ENTRY_ID}`]);
                onData(data[`get_${USER_ENTRY_ID}`]);

                articles: Array<IArticleEntry>

                res.status(200).set({
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                }).send(JSON.stringify(data));

            })}/>

    </Service>
}
