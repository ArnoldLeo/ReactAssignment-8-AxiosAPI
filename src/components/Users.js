import React, { useEffect, useState } from 'react'
import axios from 'axios'
import JSONHTTP from '../axiosConfig'

export default function Users() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setloading(true);
            const res = await JSONHTTP.get("users");
            setloading(false)
            const data = res.data;
            setusers(data)
        } catch (err) {
            console.log(err);
            setloading(false);
            seterror(err)
        }
    }
    if (!loading) {
        if (error) {
            return <div style={{ color: 'red' }}>{error.message}</div>
        }
        else {
            return (
                <div>
                    {users.map((user) => {
                        return <p key={user.id}>{user.name}</p>
                    })}
                </div>
            );
        }
    }
    else {
        return <h2 style={{ color: 'green' }}>Loading...</h2>
    }
}

