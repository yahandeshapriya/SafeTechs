import React from 'react';
import RoutesTable from './tables/table-route';

function Organization(){
    return (
        <>
            <div className="container-dashboard">
                <div className="container-header">
                    <h2 className="ct-font-secondary">Routes</h2>
                    <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                </div>

                <RoutesTable/>
            </div>
        </>
    )
}

export default Organization;
