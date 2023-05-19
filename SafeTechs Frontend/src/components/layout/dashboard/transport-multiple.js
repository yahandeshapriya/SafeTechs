import React from 'react';
import TransportsTable from './tables/table-transport';

function TransportMultiple(){
    return (
        <>
                <div className="container-header">
                        <h2 className="ct-font-secondary">Transport Brief</h2>
                        <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                </div>
                
                <TransportsTable />
        </>
    );
}

export default TransportMultiple;
