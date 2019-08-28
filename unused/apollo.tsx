import React, { useState } from 'react';

import { select, withDataLayer, callService } from 'infrastructure-components';

import GetUserService, { callGetUserService } from './get-user-service';
import AddUserService, { callAddUserService } from './add-user-service';
import { IUserEntry, USER_ENTRY_ID } from "./user-entry";
import { useMutation } from '@apollo/react-hooks';
import { Query } from "react-apollo";


import {useQuery} from "@apollo/react-hooks";



interface IApolloAidedProps {
    getEntryQuery: any, // attached through withDataLayer
    apolloClient: any, // passed through withDataLayer
    getEntryListQuery: any, // passed through withDataLayer,
}

function ApolloAided (props: IApolloAidedProps)  {

    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");


    const {query, context } = props.getEntryQuery(USER_ENTRY_ID, {
        username: "username",
        userid: "userid"
    });

    const { data, loading, error } = useQuery(query, {
            context: context,
            client: props.apolloClient
        })
    ;

    console.log( data, loading, error);

    return <div>
        <div>
            Username:
            <input value={username} onChange={event => setUsername(event.target.value)}/>
        </div>

        <div>
            Range Key:
            <input value={userid} onChange={event => setUserId(event.target.value)}/>
        </div>

        <div>
            Age:
            <input value={age} onChange={event => setAge(event.target.value)}/>
        </div>

        <div>
            Address:
            <input value={address} onChange={event => setAddress(event.target.value)}/>
        </div>


        <button onClick={() => callAddUserService({
            username: username,
            userid: userid,
            age: age,
            address: address
        })}>Save</button>

        <button onClick={async function () {
            callGetUserService(username, userid, (data: IUserEntry)=> {
                setUsername(data.username);
                setUserId(data.userid);
                setAge(data.age);
                setAddress(data.address);
            })
        }
        }>Load</button>

        <button onClick={() =>{
            setUsername("");
            setUserId("");
            setAge("");
            setAddress("");
        }}>Clear</button>



        <Query {...props.getEntryQuery(USER_ENTRY_ID, {
            username: "username",
            userid: "userid"
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

export default withDataLayer(ApolloAided);