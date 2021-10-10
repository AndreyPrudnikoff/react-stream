import React, {useEffect, useRef, useState} from 'react';
import RecordRTC from 'recordrtc'
import {useDispatch} from "react-redux";

//https://recordrtc.org/Тут читать АПИ

function VideoRoom(props) {
    const [recorder, setRecorder] = useState(null)
    const dispatch = useDispatch()

    //Делаем реф HTMLVideo, чтоб потом направлять туда стрим с вебки
    let video = useRef(null),
        onCameraFail = e => dispatch({type: 'error', payload: e.message})

    const startCapture = async (displayMediaOptions) => {
        let captureStream = null;

        try {
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        } catch (err) {
            console.error("Error: " + err);
        }
        return captureStream;
    }
    const saver = () => {
        let blob = recorder.getBlob()
        // invokeSaveAsDialog(blob)
        const name = prompt('Input name of file', 'filename')
        const file = new File([blob], name + '.webm', {type: 'video/webm'});
        const form = new FormData()
        form.append('file', file, file.name)
        fetch('http://localhost:5000/api/video', {
            headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token'), 'x-user': sessionStorage.getItem('id')},
            method: 'POST',
            body: form
        })
            .then(console.log)
            .catch(e => dispatch({type: 'error', payload: e.message}))
    }
    const setCamera = () => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({video: true, audio: true}, function (stream) {
            video.current.srcObject = stream
            setRecorder(RecordRTC(stream, {type: 'video', mimeType: 'video/mpeg'}))
        }, onCameraFail)
    }
    const setScreen = () => {
        startCapture().then(stream => {
            video.current.srcObject = stream
            setRecorder(RecordRTC(stream, {type: 'video', mimeType: 'video/mpeg'}))
        })
    }
    return (
        <div>
            <video ref={video} autoPlay id="vid"/>
            <button onClick={() => recorder && recorder.startRecording()}>Start</button>
            <button onClick={() => recorder && recorder.stopRecording(saver)}>Stop</button>
            <div className="col-3 ml-auto">
                <button onClick={setCamera} className=" m-1 btn btn-info">Camera</button>
                <button onClick={setScreen} className=" m-1 btn btn-info">Screen</button>
            </div>
        </div>
    )
}

export default VideoRoom
