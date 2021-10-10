import React, { useState } from 'react';
import http from "../http";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function VideoCreate(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const videoDefault = {
        name: "Video",
        link: "https://youtube.com",
        owner: sessionStorage.getItem('id'),
        duration: "01.22",
        quality: "360*640",
    }
    const [video, setVideo] = useState(videoDefault)

    const createVideo = (e) => {
        e.preventDefault()
        http().post('/videos', video)
            .then((a) => a.json())
            .then(({ success }) => success && history.push('/videos'))
            .catch(e => dispatch({ type: 'error', payload: e.message }))
    }
    return (
        <div>
            <form className='col-3'>
                <h2>Create Video</h2>
                <div className='mb-3'>
                    <label htmlFor='InputEmail1' className='form-label'>
                        Title
                    </label>
                    <input value={video.name} onInput={(e) => setVideo({ ...video, name: e.target.value })} type='text'
                           className='form-control' id='InputEmail1' aria-describedby='emailHelp'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='exampleInputPassword1' className='form-label'>
                        Link
                    </label>
                    <input value={video.link} onInput={(e) => setVideo({ ...video, link: e.target.value })} type='text'
                           className='form-control' id='exampleInputPassword1'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='exampleInputPassword1' className='form-label'>
                        Duration
                    </label>
                    <input value={video.duration} onInput={(e) => setVideo({ ...video, duration: e.target.value })} type='text'
                           className='form-control' id='exampleInputPassword1'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='exampleInputPassword1' className='form-label'>
                        Quality
                    </label>
                    <input value={video.quality} onInput={(e) => setVideo({ ...video, quality: e.target.value })} type='text'
                           className='form-control' id='exampleInputPassword1'/>
                </div>
                <button className='btn btn-primary' onClick={createVideo}>
                    Create
                </button>
            </form>
        </div>
    );
}

export default VideoCreate;
