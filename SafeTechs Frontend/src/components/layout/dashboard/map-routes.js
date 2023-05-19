import React from 'react';
import { MapWithADirectionsRenderer } from '../../plugins/maps/map-route';
import Directions from '../../Directions/DirectionsIndex';
import MapPannel from './pannels/map-pannel';

function MapRoutes(){
    return (
        <>
        {/* <MapWithADirectionsRenderer/> */}
        <Directions/>
        {/* <MapPannel/> */}
        </>
    );
}

export default MapRoutes;
