import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Users(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [users, setUsers] = useState([])
    const getUsers = useCallback(() => {
        http().get('/users')
            .then((a) => a.json())
            .then((users) => {
                if (!Array.isArray(users)) throw new Error(users.message)
                setUsers(users)
            })
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }, [dispatch])
    const getUser = id => {
        history.push(`user/${id}`)
    }
    useEffect(() => getUsers(), [getUsers])
    return (
        <div>
            {users.length && (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Login</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, i) => (
                            <tr onClick={() => getUser(user.id)} key={i}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className='container'>
                        <button onClick={getUsers} className='btn btn-success'>
                            CLICK
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Users;
