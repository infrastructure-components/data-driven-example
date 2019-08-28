import * as React from 'react';
import {
    callService,
    Middleware,
    mutate,
    Service,
    serviceWithDataLayer
} from "infrastructure-components";

import { USER_ENTRY_ID, IUserEntry } from './user-entry';

const ADDUSER_SERVICE_ID = "adduser";

export async function callAddUserService (userData: IUserEntry) {

    await callService(
        ADDUSER_SERVICE_ID,
        userData,
        (data: any) => {
            console.log("received data: ", data);
        },
        (error) => {
            console.log("error: " , error)
        }
    );

};

export default function AddUserService () {

    return <Service
        id={ ADDUSER_SERVICE_ID }
        path="/adduser"
        method="POST">

        <Middleware
            callback={serviceWithDataLayer(async function (dataLayer, req, res, next) {

                const parsedBody: IUserEntry = JSON.parse(req.body);

                await mutate(
                    dataLayer.client,
                    dataLayer.setEntryMutation(USER_ENTRY_ID, parsedBody)
                );

                res.status(200).set({
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                }).send("ok");

            })}/>

    </Service>
};