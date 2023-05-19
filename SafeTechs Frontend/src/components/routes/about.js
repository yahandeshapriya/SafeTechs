import React from 'react';
import { about_content } from '../../values/content';
import Title from '../layout/title-container/title';
import { ContainerSmart } from '../plugins/containers/container-smart';
import MapDefault from '../plugins/maps/map-default';

function About(){
    return (
        <>
            <Title/>
            <div className="ct-nav-panel">
                <div className="ct-icon"> <a href="#"><i class="fas fa-chevron-circle-left"></i></a></div>
                <div className="ct-icon"> CONTENT  </div>
                <div className="ct-icon ct-block"> </div>
                <div className="ct-icon">
                    <div><a href="#">Developers</a></div>
                    <div><a href="#">Platforms We Use</a></div>
                    <div><a href="#">Our Projects</a></div>
                    <div><a href="#">Our Clients</a></div>
                </div>
            </div>

            <div className="ct-row ct-cont-secondary">
        
                <div className="text-center ct-flex ct-nowrap">
                    <h1 className="ct-font-sp ct-font-secondary">Developers</h1>
                </div>

                <div className="ct-row-content text-left">
                    <p className="ct-font-secondary">If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    </p>

                    <p className="ct-font-secondary">If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    </p>

                    <div className="hr-spacer"></div>
                    <div className="hr-spacer"></div>
                </div>

                <div>
                    <button className="btn ct-btn">ENTER CREDENTIALS</button>
                    <button className="btn ct-btn ct-primary">ENTER CREDENTIALS</button>
                    <button className="btn ct-btn ct-alternate">ENTER CREDENTIALS</button>
                    <button className="btn ct-btn ct-success">ENTER CREDENTIALS</button>
                    <button className="btn ct-btn ct-warning">ENTER CREDENTIALS</button>
                    <button className="btn ct-btn ct-danger">ENTER CREDENTIALS</button>
                </div>
            </div>

            {/* <ContainerSmart/> */}

            {
               about_content.map(element => <div><ContainerSmart content={element}/></div>)
            }

            {/* <ContainerSmart content={about_content}/> */}

            <MapDefault />
        </>
    );
}

export default About;