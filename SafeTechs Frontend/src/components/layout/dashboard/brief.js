import React from 'react';
import BtnSmart from '../../plugins/buttons/btn-smart';
import Loadder from '../../plugins/loading-screen/loadder';
import EventEmitter from '../../../utils/EventEmitter';
import MapDefault from '../../plugins/maps/map-default';

function Brief(){
    const onLocationSubmit = () => {
        EventEmitter.emit("locationUpload");
    }
    return (
        <>
            <div className="container-dashboard">
                <div className="container-header">
                    <h2 className="ct-font-secondary">Brief and Shortcuts</h2>
                    <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                </div>

                <div className="cards">
                    <div className="card">
                        <i class="fas fa-envelope-open-text"></i>
                        
                        <div className="card-content">
                            <h4 className="ct-font-secondary">Messages</h4>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            <BtnSmart vals={{title:"VISIT", color:"ct-success"}}/>
                        </div>
                    </div>
                    <div className="card">
                        <i class="fas fa-newspaper"></i>
                        
                        <div className="card-content">
                            <h4 className="ct-font-secondary">News</h4>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            <BtnSmart vals={{title:"VISIT", color:"ct-success"}}/>
                        </div>
                    </div>
                    <div className="card">
                        <i class="fas fa-chart-line"></i>
                        
                        <div className="card-content">
                            <h4 className="ct-font-secondary">Activities</h4>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            <BtnSmart vals={{title:"VISIT", color:"ct-success"}}/>
                        </div>
                    </div>
                    <div className="card">
                        <i class="fas fa-history"></i>
                        
                        <div className="card-content">
                            <h4 className="ct-font-secondary">History</h4>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            <BtnSmart vals={{title:"VISIT", color:"ct-success"}}/>
                        </div>
                    </div>
                </div>

                {/* <br></br> */}

                <div className="container-header">
                    <h2 className="ct-font-secondary">Profile Information</h2>
                    <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                </div>

                

                <br></br>

                <div className="card">
                    <div className="row profile-pannel">
                        <div className="col">
                            <h3 className="ct-font-secondary"><i class="fas fa-user-tie"></i></h3>
                        </div>
                        <div className="col">
                                <h3 className="ct-font-secondary">User information</h3>
                                <p className="ct-font-secondary">Following menu conclude of options that will available for Organization admins and super admins.
                                Following menu conclude of options that Organization admins and super admins.
                                </p>
                                <p className="ct-font-secondary">USERNAME - [username]</p>
                                <p className="ct-font-secondary">EMAIL - [username]</p>
                                <p className="ct-font-secondary">CONTACT - [username]</p>
                                <p className="ct-font-secondary">PROFESSION - [username]</p>
                                <p className="ct-font-secondary">TEAM - [team]</p>
                                <p className="ct-font-secondary">USERNAME - [username]</p>
                        </div>
                    </div>
                </div>

                <br></br>

                <div className="container-header">
                    <h2 className="ct-font-secondary">Give Your Location</h2>
                    <p className="ct-font-secondary-light">Providing your location infortion is necessary to get transportation services.</p>
                </div>

                <MapDefault/>
                <br></br>
                <div className="text-center">
                    <button className="btn ct-btn ct-success" onClick={()=>onLocationSubmit()}>Update Your location</button>
                </div>

                {/* <div className="card">
                    <Loadder/>
                </div> */}
            </div>
        </>
    );
}

export default Brief;
