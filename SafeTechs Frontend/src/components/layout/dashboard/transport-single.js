import React, { useEffect, useState } from 'react';
import querystring from 'query-string';
import transport_service from '../../../services/transport_service';
import route_service from '../../../services/route_service';

function TransportSingle({location}){
    
    const [info, setInfo] = useState(null);
    const [routes, setRoutes] = useState(null); 
    const [selectedRoute, setRoute] = useState(null); 
    const [passengers, setPassengers] = useState(0);

    const getResource = async (val) => {
        await transport_service.getTransport(val).then((data)=>{
            setInfo(data);
            setRoute(data.route)
        });
        await route_service.getRoutes().then((data)=>{setRoutes(data); console.log(routes)});
       
    }

    useEffect(() => {
        const {code} = querystring.parse(window.location.search);
        // console.log(code);
        getResource(code);
        console.log(routes);
        return () => {
            
        }
    }, []);
    return (
        <>
                    <div className="container-header">
                        <h2 className="ct-font-secondary">Transport Informattion</h2>
                        <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                    </div>

                    <div className="card">
                        <i class="fas fa-envelope-open-text"></i>

                        {
                            info?<div className="card-content">
                            <h4 className="ct-font-secondary">Vehicle</h4>
                            <h5 className="ct-font-secondary">CODE: {info.code}</h5>
                            <h5 className="ct-font-secondary">DRIVER: {info.driver}</h5>
                            <h5 className="ct-font-secondary">ROUTE: {info.route?info.route:'No Route Assigned'}</h5>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            </div>
                            : null
                        }
                    </div>

                    <br></br>

                    <div className="container-header">
                        <h2 className="ct-font-secondary">Route Information</h2>
                        <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                    </div>

                    <div className="card">
                        <div className="normal-pannel">
                            <div>
                                <i class="fas fa-envelope-open-text"></i>

                            {
                                info?<div className="card-content">
                                <h4 className="ct-font-secondary">Route</h4>
                                <div class="form-row">
                                    <div class="form-group col-md-8">
                                    <label for="inputRoute" className="ct-font-secondary">Route</label>
                                    <select id="inputRoute" class="form-control" onChange={(e)=>{setRoute(selectedRoute=>selectedRoute=e.target.value); selectedRoute?console.log(selectedRoute):console.log("none")}}>
                                        <option selected>Choose...</option>
                                        {
                                            routes&&routes.length>0&&routes.map((route)=><option className="ct-font-secondary" value={route.name}>{route.name}</option>)
                                        }
                                        <option>...</option>
                                    </select>
                                    </div>
                                </div>
                                <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                                </div>
                                : null
                            }
                            </div>
                            <div>
                            <i class="fas fa-envelope-open-text"></i>

                                {
                                    info?<div className="card-content">
                                    <h4 className="ct-font-secondary">Options</h4>
                                    <div class="form-row">
                                        <div class="form-group col-md-8">
                                        <label for="inputRoute" className="ct-font-secondary">Passenger Limitattion</label>
                                        <select id="inputRoute" class="form-control" onChange={(e)=>{setPassengers(passengers=>{passengers=e.target.value}); selectedRoute?console.log(selectedRoute):console.log("none")}}>
                                            <option className="ct-font-secondary" value={9} selected>Normal Limitation</option>
                                            <option className="ct-font-secondary" value={6}>COVID Limitation</option>
                                            <option className="ct-font-secondary" value={20}>Full Load</option>
                                            <option className="ct-font-secondary">...</option>
                                        </select>
                                        </div>
                                    </div>
                                    <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        
                    </div>

                    <br></br>

                    <div className="container-header">
                        <h2 className="ct-font-secondary">Allocate Users</h2>
                        <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                    </div>

                    <div className="ct-wrap">
                        <div className="card">
                            <i class="fas fa-user-plus"></i>
                            <br></br>
                            <button className="btn ct-btn ct-primary">Add User</button>
                        </div>
                        {
                            selectedRoute&&selectedRoute.latlng&&selectedRoute.latlng>0&&selectedRoute.latlng.map((stop) =>
                            <div className="card">
                                <i class="fas fa-user-plus"></i>
                                <br></br>
                                <button className="btn ct-btn ct-primary">Add User</button>
                            </div> 
                            )
                        }
                    </div>
                

        </>
    );
}

export default TransportSingle;
