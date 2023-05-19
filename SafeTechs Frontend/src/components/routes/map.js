import React from 'react'
import SidePanel from '../plugins/maps/children/side-panel';
import MapDefault from '../plugins/maps/map-default'
import { MapWithADirectionsRenderer } from '../plugins/maps/map-route'

function Map(){
    return (
        <>

            <MapDefault />
            {/* <MapWithADirectionsRenderer/> */}

            <SidePanel />

        </>
    );
}

export default Map;