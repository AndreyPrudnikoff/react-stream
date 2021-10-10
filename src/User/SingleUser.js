import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";
import { useDispatch } from "react-redux";

function SingleUser(props) {
    const dispatch = useDispatch()
    const { id } = props.match.params
    const initialUser = {
        login: "",
        email: "",
        avatar: "",
        role: ""
    }
    const [file, setFile] = useState(new Blob())
    const [user, setUser] = useState(initialUser)

    const setAvatar = () => {
        const form = new FormData()
        form.append('file', file, file.name)
        fetch('http://localhost:5000/api/file', {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') },
            method: 'POST',
            body: form
        })
            .then(() => getUser())
            .catch(console.log)
    }
    const getUser = useCallback(() => {
        http().get(`/users/${id}`)
            .then((a) => a.json())
            .then(user => setUser(user))
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }, [dispatch, id])
    const updateUser = async () => {
        if (file.size) {
            await setAvatar()
        }
        http().patch(`/users/${id}`,
            file.size ? { ...user, avatar: `http://localhost:5000/static/${file.name}` } : user)
            .then(getUser)
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }

    useEffect(() => getUser(), [getUser])
    return (
        <div>
            <div className="card col-3 m-5">
                <label className="card-img-top">
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" name="file" id="file"/>
                    <img className="card-img-top" src={user.avatar || ''} alt="avatar"/>
                </label>
                <div className="card-body">
                    <input onInput={(e) => setUser({ ...user, login: e.target.value })} type="text"
                           className="card-title form-control" defaultValue={user.login}/>
                    <input onInput={(e) => setUser({ ...user, email: e.target.value })} type="text"
                           className="card-title form-control" defaultValue={user.email}/>
                    <input readOnly defaultValue={user.role} className="card-title form-control" type="text"/>
                    <button onClick={updateUser} className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    );
}

export default SingleUser;
