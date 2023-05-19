import React, { useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import TransportForm from '../popups/transport';
import EventEmitter from '../../../utils/EventEmitter';
import BtnSmart from '../../plugins/buttons/btn-smart';
import TransportsTable from './tables/table-transport';
import TransportSingle from './transport-single';
import TransportMultiple from './transport-multiple';

function Routes(){
    const {url, path} = useMatch();
    const [form, setForm] = useState(false);

    const openPanel = () => {
        setForm((form)=>!form);
    }

    useEffect(() => {
        
        const formSwap = EventEmitter.addListener('transportform', openPanel);
        return () => {
            formSwap.remove()
        }
    }, [])

    return (
        <>
        
                <div className="container-dashboard">
                    <div className="container-header">
                        <h2 className="ct-font-secondary">Transport Related Options</h2>
                        <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                    
                    </div>

                    <div className="cards">
                    <div className="card">
                        <i class="fas fa-envelope-open-text"></i>
                        
                        <div className="card-content">
                            <h4 className="ct-font-secondary">Add Transport</h4>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            <button className="btn ct-btn ct-success" onClick={()=>{openPanel()}}>VISIT</button>
                        </div>
                    </div>
                    <div className="card">
                        <i class="fas fa-newspaper"></i>
                        
                        <div className="card-content">
                            <h4 className="ct-font-secondary">Allocate Users</h4>
                            <p className="ct-font-secondary-light">Card consist of necessary options in a inateractive manner.</p>
                            <BtnSmart vals={{title:"VISIT", color:"ct-success"}}/>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path={path} exact component={TransportMultiple}/>
                    <Route path={`${path}/transport`} exact component={TransportSingle}/>
                </Routes>

                
                </div>
                {form?<TransportForm />:<></>}
            
        </>
    )
}

export default Routes;
