import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Error({message}) {
    const clearError = useDispatch()
    const history = useHistory()
    const clear = () => {
        clearError({type: 'error', payload: ''})
        history.push('/')
    }
    return (
        <div onClick={clear} className="error">
            <h2>{message}</h2>
        </div>
    );
}

export default Error;
