import React, { useEffect, useState } from 'react';
import route_service from '../../../../services/route_service';
import './table.css';

const RoutesTable = ({data, category}) => {

    const [routes, setRoutes] = useState([]);

    const getTransports = async () => {
        // setUsers();
        await route_service.getRoutes().then((routes)=>{
            setRoutes(routes);
        });
        
    }

    const deleteRoute = async (id) => {
        await route_service.deleteRoute(id);
    }

    const updateRouteStatus = async (id, transport) => {
        await route_service.updateRoute(id, transport);
    }
    useEffect(() => {
        
        getTransports();
        return () => {
            
        }
    }, []);
    
    return (
        <div className="container-table">
            <div className="table-heading">
                <h2 className="ct-font-secondary-light">Routes Stats</h2>
                <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                
            </div>
            <br></br>
            <div className="table-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col" className="ct-font-secondary-light">No.</th>
                        <th scope="col" className="ct-font-secondary-light">Origin</th>
                        <th scope="col" className="ct-font-secondary-light">Destination</th>
                        <th scope="col" className="ct-font-secondary-light">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            routes&&routes.length>0?
                            routes.map((route)=>
                            <tr key={route.code}>
                                <th scope="row" className="ct-font-secondary-light">1</th>
                                <td className="ct-font-secondary-light">{route.name}</td>
                                <td className="ct-font-secondary-light">{route.destination}</td>
                                <th scope="col" className="ct-font-secondary-light">
                                    <button className="btn btn-success" onClick={
                                        ()=>{
                                            updateRouteStatus(route.code, route); 
                                            setRoutes(routes.filter(item => item.code !== route.code)); 
                                            setRoutes(route=>[...routes, route]);
                                        }}
                                        >ALLOCATE</button>| 
                                    <button className="btn btn-info">VIEW</button>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteRoute(route.code);
                                            setRoutes(routes.filter(item => item.code !== route.code));
                                        }}
                                        >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :null
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default RoutesTable;