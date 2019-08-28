import * as React from 'react';

import {
    callService,
    Middleware,
    select,
    Service,
    serviceWithDataLayer
} from "infrastructure-components";

import {IUserEntry, USER_ENTRY_ID} from './user-entry';

export const GETUSER_SERVICE_ID = "getservice";

export async function callGetUserService (username: string, userid: string, onData: (userData: IUserEntry) => void) {

    await callService(
        GETUSER_SERVICE_ID,
        {
            username: username,
            userid: userid
        },
        async function (response: any) {
            console.log("received data: ", response);

            await response.json().then(function(data) {
                console.log(data[`get_${USER_ENTRY_ID}`]);
                onData(data[`get_${USER_ENTRY_ID}`]);
            });
        },
        (error) => {
            console.log("error: " , error)
        }
    );

}

export default function GetUserService () {
    return <Service
        id={ GETUSER_SERVICE_ID }
        path="/getuser"
        method="GET">

        <Middleware
            callback={serviceWithDataLayer(async function (dataLayer, req, res, next) {

                console.log("this is the service: ", req.query);

                const data = await select(
                    dataLayer.client,
                    dataLayer.getEntryQuery(USER_ENTRY_ID, {
                        username: req.query.username,
                        userid: req.query.userid
                    })
                );

                res.status(200).set({
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                }).send(JSON.stringify(data));

            })}/>

    </Service>
}
