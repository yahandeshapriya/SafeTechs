import React from 'react';
import { Link } from 'react-router-dom';
import BtnSmart from '../../plugins/buttons/btn-smart';
import './video.css';
import logo from './LogoDesign.jpg'

function VideoContainer(){

    return (
        <div className="ct-video-cont">
            <video autoPlay muted loop>
                <source src={'assets/videos/highway.mp4'} type="video/mp4"/>
            </video>

            <div className="video-caption">
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <div className="hr-spacer"></div>
                <BtnSmart vals={{title:"Join Now", color:"ct-white"}}/>
                <br></br>
            </div>
        </div>
    )
}

export default VideoContainer;

