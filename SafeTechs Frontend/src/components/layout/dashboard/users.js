import React from 'react';
import UsersTable from './tables/table-users';

function Users(){
    return (
        <>
            <div className="container-dashboard">
                <div className="container-header">
                    <h2 className="ct-font-secondary">Users Mmanager</h2>
                    <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                </div>

                <div className="card">
                    <i class="fas fa-users-cog font-special"></i>
                    <UsersTable />
                </div>
            </div>
        </>
    )
}

export default Users;
