import React, { useEffect } from 'react';
import EventEmitter from '../../../../utils/EventEmitter';
import './pannel.css';

export default function MapPannel() {

    const onSave = () => {
        // FirStore Save Action for Routes
        EventEmitter.emit('saveRoute', {save:true});
    }

    const onRouteManage = () => {
        // Route Manage Option
    }

    useEffect(() => {
        return () => {
            
        }
    }, [])
    return  (
        <>
            <div className="map-pannel">
                <div className="control-area">
                    <div className="control" onClick={()=>onRouteManage()}>
                        <div className="icon">
                            <i class="fas fa-road"></i>
                        </div>
                        <div className="text">
                            <small>ROUTE MANAGE</small>
                        </div>
                    </div>
                    <div className="control" onClick={()=>onRouteManage()}>
                        <div className="icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="text">
                            <small>MARKER MANAGE</small>
                        </div>
                    </div>
                    <div className="control" onClick={()=>onSave()}>
                        <div className="icon">
                            <i class="fas fa-save"></i>
                        </div>
                        <div className="text">
                            <small>SAVE</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
