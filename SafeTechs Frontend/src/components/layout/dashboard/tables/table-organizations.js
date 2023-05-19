import React, { useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import organization_service from '../../../services/organization_service';
import './table.css';

const OrganizationsTable = ({data, category}) => {
    const { path, url } = useMatch();
    const [organizations, setOrganizations] = useState([]);
    const getOrganizations = async () => {
        setOrganizations(await organization_service.getOrganizations());
        // await organization_service.getOrganizations().then((org)=>{

        // })
    }

    const deleteOrganization = async (id) => {
        console.log("LAUNCH");
        await organization_service.deleteOrganization(id)
        // setOrganizations(await organization_service.getOrganization(id));
    }

    const updateOrganizationStatus = async (id, organization, status) => {
        organization.status = status;
        setOrganizations(await organization_service.updateOrganization(id, organization))
    }
    useEffect(() => {
        
        getOrganizations();
        console.log(organizations);
        return () => {
            
        }
    }, []);
    
    return (
        <div className="card">
        <div className="container-table">
            <div className="table-heading">
                <h2>Organizations Stats</h2>
                <p>Dashboard consist of necessary settings for admins and paticular management roles.</p>
                <button className="btn btn-primary" onClick={()=>getOrganizations()}>VIEW</button>
            </div>
            <br></br>
            <div className="table-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Incharge</th>
                        <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            organizations&&organizations.length>0?
                            organizations.map((organization)=>
                            <tr key={organization.id}>
                                <th scope="row">1</th>
                                <td>{organization.name}</td>
                                <td>{organization.address}</td>
                                <td>{organization.incharge?organization.incharge:'Never Mentioned'}</td>
                                <th scope="col"> 
                                    <Link to={`${url}/organization?id=${organization.id}`}><button className="btn btn-info">VIEW</button></Link>|
                                    <button className="btn btn-danger" onClick=
                                    {
                                        ()=>{
                                            deleteOrganization(organization.id);
                                            setOrganizations(organizations.filter(item => item.id !== organization.id));
                                        }
                                    }
                                    >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :
                            <></>
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}


export default OrganizationsTable;