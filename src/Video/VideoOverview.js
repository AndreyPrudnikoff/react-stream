import React, { useCallback, useEffect, useState } from 'react';
import http from "../http";
import { useDispatch } from "react-redux";

function VideoOverview(props) {
    const dispatch = useDispatch()
    const id = props.location.state.id
    const [video, setVideo] = useState(null);
    const getVideo = useCallback(() => {
        http().get(`/videos/${id}`)
            .then((a) => a.json())
            .then((video) => {
                if (video.statusCode === 401) throw new Error(video.message)
                setVideo(video)
            })
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }, [id, dispatch]);

    useEffect(() => getVideo(), [getVideo])
    return (
        <div>
            {video &&
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Duration</th>
                    <th>Quality</th>
                    <th>Created</th>
                    <th>Owner</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{video.name}</td>
                    <td><a href={video.link}>{video.link}</a></td>
                    <td>{video.duration}</td>
                    <td>{video.quality}</td>
                    <td>{(new Date(video.created)).toLocaleString()}</td>
                    <td>{video.owner}</td>
                </tr>
                </tbody>
            </table>}
        </div>
    );
}

export default VideoOverview
