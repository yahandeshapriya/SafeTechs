import React, { useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import transport_service from '../../../../services/transport_service';
import './table.css';

const TransportsTable = ({data, category}) => {
    const {url, path} = useMatch();
    const [vehicles, setVehicles] = useState([]);
    // const [approved, setApproved] = useState([]);
    // const [notapproved, setNotApproved] = useState([]);
    const [type, setType] = useState('disconnected');

    const getTransports = async () => {
        // setUsers();
        await transport_service.getTransports().then((vehicles)=>{
            setVehicles(vehicles);
            vehicles.forEach((user)=>{
            });
        });
        
    }

    const deleteTransport = async (id) => {
        await transport_service.deleteTransport(id);
    }

    const updateTransportStatus = async (id, transport) => {
        await transport_service.updateTransport(id, transport);
    }
    useEffect(() => {
        
        getTransports();
        console.log(vehicles);
        return () => {
            
        }
    }, []);
    
    return (
        <div className="container-table">
            <div className="table-heading">
                <h2 className="ct-font-secondary-light">Transport Stats</h2>
                <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                <button className="btn btn-warning" onClick={()=>setType('activated')}>ENTERED VEHICLES</button>
            </div>
            <br></br>
            <div className="table-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col" className="ct-font-secondary-light">No.</th>
                        <th scope="col" className="ct-font-secondary-light">Vehicle type</th>
                        <th scope="col" className="ct-font-secondary-light">Driver</th>
                        <th scope="col" className="ct-font-secondary-light">Route</th>
                        <th scope="col" className="ct-font-secondary-light">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            type==='disconnected'&&vehicles&&vehicles.length>0?
                            vehicles.map((vehicle)=>
                            <tr key={vehicle.code}>
                                <th scope="row" className="ct-font-secondary-light">{vehicle.code}</th>
                                <td className="ct-font-secondary-light">{vehicle.type}</td>
                                <td className="ct-font-secondary-light">{vehicle.name}</td>
                                <td className="ct-font-secondary-light">
                                    {vehicle.route}
                                    <button className="btn btn-success" onClick={
                                        ()=>{
                                            updateTransportStatus(vehicle.code, vehicle); 
                                            setVehicles(vehicles.filter(item => item.code !== vehicle.code)); 
                                            setVehicles(vehicles=>[...vehicles, vehicle]);
                                        }}
                                        >ASSIGN ROUTE</button>
                                </td>
                                <th scope="col" className="ct-font-secondary-light">
                                    
                                    <Link to={`${url}/transport?code=${vehicle.code}`}><button className="btn btn-info">VIEW</button></Link>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteTransport(vehicle.code);
                                            setVehicles(vehicles.filter(item => item.code !== vehicle.code));
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


export default TransportsTable;