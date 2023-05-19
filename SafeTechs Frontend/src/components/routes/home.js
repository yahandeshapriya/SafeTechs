import React from 'react';
import { home_content } from '../../values/content';
import Slider from '../layout/slider-container/slider';
import VideoContainer from '../layout/video-container/video-container';
import BtnSmart from '../plugins/buttons/btn-smart';
import { CardSmart } from '../plugins/cards/card-smart';
import { ContainerSmart } from '../plugins/containers/container-smart';

function Home(){
    return (
        <>
        {/* <Slider/> */}
        <VideoContainer/>

        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>

       

        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>

        <div className="ct-row">
            <div className="text-center">
                <h1 className="ct-font-sp ct-font-primary">It is our duty</h1>
                <h1 className="ct-font-em ct-font-special ct-less-height">EMPHASIS</h1>
            </div>
        </div>

        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>

        <div className="ct-row-content">
            <p>If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
            If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
            If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
            If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
            </p>

            <p>If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
            If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
            </p>

            <div className="container-img" style={{width: '60%'}}></div>

            <div className="hr-spacer"></div>

            <BtnSmart vals={{title:"JOING", color:"ct-success"}}/>
            <BtnSmart vals={{title:"Learn More", color:"ct-alternate"}}/>
        </div>

        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>

        

        <div className="hr-spacer"></div>
        <div className="hr-spacer"></div>

        {
            home_content.map(element=><ContainerSmart model={element}/>)
        }
        
        
        </>
    );
}

export default Home;
