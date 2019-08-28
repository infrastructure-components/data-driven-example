import React, { useState } from 'react';

import { select, withDataLayer, callService } from 'infrastructure-components';

import GetUserService, { callGetUserService } from './get-user-service';
import AddUserService, { callAddUserService } from './add-user-service';
import {IUserEntry} from "./user-entry";


export default function DataForm (props)  {

    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");

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

    </div>
};
