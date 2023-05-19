import React from 'react';
import './dashboard.css';
import { Route, Routes, useMatch } from 'react-router-dom';
import SideBar from './sidebar/sidebar';
import Brief from './brief';
import Users from './users';
import Transport from './transport';
import Organization from './organization';
import MapRoutes from './map-routes';

function Main(){
    let {url, path} = useMatch();
    return (
        <>

        <SideBar />

        <Routes>
            <Route path={path} exact element={<Brief/>}/>
            <Route path={`${path}/users`} exact element={<Users/>}/>
            <Route path={`${path}/organization`} exact element={<Organization/>}/>
            <Route path={`${path}/transport`} element={<Transport/>}/>
            <Route path={`${path}/map`} exact element={<MapRoutes/>}/>
        </Routes>

        
        </>
    )

}

export default Main;
