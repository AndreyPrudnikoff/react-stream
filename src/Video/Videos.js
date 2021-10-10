import React, {useCallback, useEffect, useState} from 'react'
import http from "../http"
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import './videos.scss'

function Videos(props) {
    const [videos, setVideos] = useState([]);
    // const id = sessionStorage.getItem('id')
    const history = useHistory()
    const dispatch = useDispatch()

    const viewVideo = ({id, name}) => {
        history.push(`/video/${name}`, {id})
    }
    const getVideos = useCallback(() => {
        http().get('/videos')
            .then((a) => a.json())
            .then((videos) => {
                if (!Array.isArray(videos)) throw new Error(videos.message)
                setVideos(videos)
            })
            .catch(e => dispatch({type: 'error', payload: e.message}))
    }, [dispatch]);

    useEffect(() => getVideos(), [getVideos])

    return (
        <div>
            <button onClick={() => history.push('/video-room')} className="btn btn-danger">New</button>
            {videos.length && (
                <>
                    <div className="video-cards">
                        {videos.map((video, i) => (
                            <div className="card" onClick={() => viewVideo(video)} key={i}>
                                <div className="wrap-video">
                                    <video controls src={video.link}/>
                                </div>
                                <div><b>Title:</b> {video.name}</div>
                                <div><b>Duration:</b> {video.duration}</div>
                                <div><b>Quality:</b> {video.quality}</div>
                                <div><b>Created:</b> {(new Date(video.created)).toLocaleString()}</div>
                                <div><b>Owner:</b> {video.owner}</div>

                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Videos;
