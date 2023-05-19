import React, {useEffect, useState} from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';
import Session from 'react-session-api';
import { FaBeer, FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiFillCloseSquare } from 'react-icons/ai';
import BtnSmart from '../../plugins/buttons/btn-smart';
import EventEmitter from '../../../utils/EventEmitter';

function Navigation() {
    const [icon, setIcon] = useState(false);
    const [nav, setNav] = useState(true);
    const [logged, setLogged] = useState(Session.get("username")?true:false);
    var [username, setUsername] = useState(Session.get("username")||null);
    var [userrole, setRole] = useState(Session.get("role")||null);

    const handleIcon = () => {setIcon(!icon)};

    const showNav = () => {
        if(window.innerWidth <= 1000) {
            setNav(false);
        } else {
            setNav(true);
        }
    }

    const showLogPannel = () => {
        EventEmitter.emit("closePannel", {close:false});
    }



    useEffect(() => {
        const changeLog = () => {setLogged(!logged); setUsername(Session.get("username")); setRole(Session.get("role"));}
        const listner = EventEmitter.addListener("loginCompleted", changeLog);
        
        return () => {
            // listner.remove();
        }
    });


    const onLogout = () => {
        Session.clear();
        setUsername(null);
        setRole(null);
        setLogged(false);
        EventEmitter.emit("logout", {logged:false});
    }

    window.addEventListener('load', showNav);
    window.addEventListener('resize', showNav);

    return (
        <div>
            
            <nav className="navbar ct-navbar">
                <div className="ct-flex ct-navbar-inside ">
                    <div className="ct-navbar-header">
                        <Link className="ct-navbar-brand" to="/">SafeTechs</Link>
                        
                    </div>
                    
                    <div className="ct-navbar-body">

                        {
                            nav? 
                                <>
                                <Link className="ct-main-link" to="/technical">Technical Guide</Link>
                                <Link className="ct-main-link" to="/about">About Us</Link>
                                {logged&&<Link className="ct-main-link" to="/map">Map</Link>}
                                <Link className="ct-main-link" to="/contact">Contact Us</Link>
                                
                                </>
                            :<></>
                        }
                        
                        
                    </div>
                    <div className="ct-navbar-log">
                        
                        {
                            nav?
                                <>
                                    {
                                        logged?
                                                <>
                                                    {/* <button className="btn ct-btn " onClick={onLogout}>LOGOUT</button> */}
                                                    <div className="ct-clip-btn">
                                                        <button className="btn ct-btn half-curved" ><Link to={`/profile`}>{username}</Link></button>
                                                        
                                                        <a href="#" class="ct-btn-sm" onClick={onLogout}><i class="fas fa-search"></i></a>
                                                    </div>
                                                    {/* <i class="fas fa-search"></i> */}
                                                </>
                                            :
                                            
                                                <>
                                                    <Link className="ct-main-link" style={{marginRight: '20px'}} to="/join">Join Now</Link>
                                                    
                                                    <a className="ct-main-link" onClick={showLogPannel}>Login</a>
                                                    
                                                </>
                                    }
                                    
                                </>
                                :<></>
                        }
                    </div>
                    <div className="ct-navbar-bar">
                        {
                            !nav?
                                <>
                                    <div className="ct-main-link" onClick={handleIcon}>{icon?<FaBars />:<AiFillCloseSquare/>}</div>
                                </>
                                :<></>
                        }
                    </div>
                </div>

                {/* Mobile Navigation */}
                {
                    (!nav&&!icon)?
                    <>
                        <div className="ct-flex ct-navbar-mobile">
                                <div className="ct-main-link" to="#">
                                    <div className="ct-profile-container">

                                        <BtnSmart vals={{title:"Login", color:"ct-alternate"}}/>
                                        <br></br>
                                        <button className="btn ct-btn ct-warning">Create Account</button>
                                        <br></br>
                                        <BtnSmart vals={{title:"User", type:'clip', color:"ct-alternate"}}/>
                                    </div>
                                </div>
                                <Link className="ct-main-link" to="/about">About Us</Link>
                                <Link className="ct-main-link" to="/tips">Tips</Link>
                                <Link className="ct-main-link" to="/test">Learning Activities</Link>
                                <Link className="ct-main-link" to="/contact">Connect with Us</Link>
                        </div>
                    </>
                    :<></>
                }
            </nav>

        </div>
    );
}
export default Navigation;
