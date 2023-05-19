import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import './popup.css';
// import './forms.css';
import EventEmitter from '../../../utils/EventEmitter';
import Transportation from '../../../models/Transportation';
import transport_service from '../../../services/transport_service';

const TransportForm = () => {

    const [name, setName] = useState('');
    const [type, setType] = useState('Not Mentioned');
    const [route, setRoute] = useState(null);


    const onClose = ( ) => {
        EventEmitter.emit('transportform');
    }


    const transportSubmit = () => {
        console.log("category - ");
        var transport = new Transportation(uniqid(), route, type, name);
        transport_service.addTransport(transport);
    }

    

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        
            <div className="ct-popup-box">
                <div className="ct-close" onClick={onClose} >X</div>
                <div className="ct-pupup-head text-center">

                    <h1 className="ct-font-secondary">LOGIN</h1>
                    <p>Some Description</p>

                </div>

                <div className="ct-popup-body text-left ct-flex">

                    <div className="form-col">
                    <div class="form-group">
                    <label for="name">Driver Name</label>
                    <input type="text" class="form-control" id="name" placeholder="eg: Sugathdasa D. A."
                    onChange={(event)=>setName(event.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="parent">Type</label>
                    <select class="form-control" id="parent"
                    onChange={(event)=>setType(event.target.value)}>
                        <option value="Not Mentioned">Not Mentioned</option>
                        <option value="Van">Van</option>
                        <option value="Bus">Bus</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="parent">Allocate for a Route</label>
                    <select class="form-control" id="parent"
                    onChange={(event)=>setRoute(event.target.value)}>
                    <option value="1">1</option>
                    <option>2</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" onClick={transportSubmit}>Create Organization</button>
                    </div>
            </div>
        
        
        </div>
    );
}

export default TransportForm;
