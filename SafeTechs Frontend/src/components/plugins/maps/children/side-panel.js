import React, { useEffect, useState } from 'react'
import usersService from '../../../../services/users.service'

const SidePanel = (props) => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        await usersService.getUsers().then((data) => {
            setUsers(data);
            data.forEach((doc) => {
                if(doc.model&&doc.model!==""){

                }
            })
        });
    }

    useEffect(() => {
        getUsers();
        return () => {
          
          
        }
    }, [])
    return (
        <div className="ct-sidepannel map-side">

            

            <div className="pannel-header">
                <div className="pannel-icon">

                </div>    
            </div>

            <div className="pannel-body">
                <div className="text-center">
                    <h4>Active Cases</h4>
                    <p>List of Vehicles.</p>

                    <div className="ext-container">
                        
                    </div>
                </div>

            </div>

            <div className="pannel-footer">
                
            </div>

        </div>
    )
}

export default SidePanel;