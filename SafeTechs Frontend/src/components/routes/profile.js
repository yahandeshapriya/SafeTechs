import React, { useEffect, useState } from 'react';
import Session from 'react-session-api';
// import MapDefault from '../plugins/maps/map-default';
import { Link, useNavigate } from 'react-router-dom';
import usersService from '../../services/users.service';

function Profile(){
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState('');
    const [contact, setContact] = useState('');
    const [pass, setPass] = useState('');
    const [model, setModel] = useState('');

    var [username, setUsername] = useState(Session.get("username")||null);
    var [userrole, setRole] = useState(Session.get("role")||null);

    // Questionaire 
    var [q1, setQ1] = useState(false);
    var [q2, setQ2] = useState(false);

    const getUser = async () => {
        await usersService.getUser(username).then((user) => {
            setProfile(user);
            if(user.contactList) setContacts(user.contactList);
            if(user.health){
                user.health.heart_issues?setQ1(user.health.heart_issues):setQ1(false);
                user.health.sight?setQ2(user.health.sight):setQ2(false);
            }
        })
    }

    const updateUser = async (obj) => {
        console.log(obj);
        await usersService.updateUser(username, obj).then(() => {
            alert("User Updated");
        })
    }

    useEffect(() => {
        
        if(!username) {navigate('/')}
        getUser();
        
        return () => {
        }
    }, []);
    return (
        <>
            <div className="ct-nav-panel">
                <div className="ct-icon"> <a href="#"><i class="fas fa-chevron-circle-left"></i></a></div>
                <div className="ct-icon"> Your Profile</div>
                <div className="ct-icon ct-block"> </div>
                <div className="ct-icon">
                    <div><Link to={'/profile/health'}>Health Information</Link></div>
                </div>
            </div>

            <div className="ct-row ct-cont-secondary">
        
                <div className="text-center ct-flex ct-nowrap">
                    <h1 className="ct-font-sp ct-font-secondary">User Information</h1>
                </div>

                <div className="ct-row-content text-left">

                    <div className="ct-row text-center">
                        <h3 className="ct-font-secondary">{username}</h3>
                        <h5 className="ct-font-secondary">{userrole}</h5>
                    </div>
                    {profile&&<div className="ct-row text-left">
                        <h4 className="ct-font-secondary">ADDRESS: {profile.address}</h4>
                        <h4 className="ct-font-secondary">EMAIL: {profile.email}</h4>
                        <h4 className="ct-font-secondary">CONTACT NUMBER: {profile.contact}</h4>
                        <h4 className="ct-font-secondary">MODEL DETAILS: {profile.model}</h4>
                    </div>}
                    {userrole&&userrole==="User"&&<div className='ct-row'>
                    <div className="form-col">
                            <form onSubmit={(event)=>{event.preventDefault(); }}>
                                <div class="form-group ">
                                        <label className='ct-font-secondary' for="inputusername">Add New Model Number</label>
                                        <input 
                                            onChange={(event)=>setModel(event.target.value)}
                                            type="text" class="form-control" id="inputusername" placeholder="Model Number of device used for your vehicle"
                                        />
                                </div>
                                <div className="hr-spacer"></div>
                                <div className="text-center">
                                        <button type="submit" class="btn ct-btn ct-success" onClick={() => {
                                            
                                        }}>Sync with Model</button>
                                </div>

                            </form>
                    </div>
                    </div>}
                </div>


                {userrole&&userrole==="User"&&<div className="ct-row-content text-left">

                    {/* <p className="ct-font-secondary">If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    </p> */}
                    <div className='ct-col'>
                        <div className="text-center ct-flex ct-nowrap">
                            <h1 className="ct-font-sp ct-font-secondary">Edit Member Settings</h1>
                        </div>
                    </div>
                    <div className='ct-col'>
                    <div className="form-col">
                                <h4>Create Contact List</h4>
                                <form onSubmit={(event)=>{event.preventDefault(); }}>

                                    <div class="form-group ">
                                        <label className='ct-font-secondary' for="inputusername">Add User</label>
                                        <input 
                                            onChange={(event)=>setUser(event.target.value)}
                                            type="text" class="form-control" id="inputusername" placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="hr-spacer"></div>
                                    <div  class="form-group ">
                                        <label className='ct-font-secondary' for="inputusername">Contact NUmber</label>
                                        <input 
                                            onChange={(event)=>setContact(event.target.value)}
                                            type="text" class="form-control" id="inputusername" placeholder="Enter Phone number"
                                        />
                                    </div>
                                    <div className="hr-spacer"></div>
                                    <div class="form-group ">
                                        <label className='ct-font-secondary' for="inputusername">Provide Password</label>
                                        <input 
                                            onChange={(event)=>setPass(event.target.value)}
                                            type="text" class="form-control" id="inputusername" placeholder="Provide Password"
                                        />
                                    </div>

                                    <div className="hr-spacer"></div>
                                    <div className="text-center">
                                        <button type="submit" class="btn ct-btn ct-success" onClick={() => {
                                            setContacts(data => [...data, {user: user, contact: contact, password: pass}]);
                                        }}>Add Contact</button>
                                    </div>

                                </form>

                    </div>
                    </div>
                    <div className='ct-col'>

                        {contacts&&contacts.map((item) => <div className='card'>
                            <h5 className='ct-font-secondary'>{item.user}</h5>
                            <span className='ct-font-secondary'>{item.contact}</span>
                            <hr></hr>
                            <span className='ct-font-secondary'>Given Password: {item.password}</span>
                        </div>)}
                        

                    </div>
                    <div className="hr-spacer"></div>
                    <div className="text-center">
                        <button type="submit" class="btn ct-btn ct-warning" onClick={() => {
                                profile.contactList = contacts;
                                updateUser(profile);
                            }}>Update Contact List</button>
                    </div>

                    <div className="hr-spacer"></div>
                    <div className="hr-spacer"></div>
                </div>}
                {userrole&&userrole==="User"&&<div className="ct-row-content text-left">

                    {/* <p className="ct-font-secondary">If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    If your image is located somewhere online, you can set the background image of your element by placing the URL like this.
                    </p> */}
                    <div className='ct-col'>
                        <div className="text-center ct-flex ct-nowrap">
                            <h1 className="ct-font-sp ct-font-secondary">Health Related Information</h1>
                        </div>
                    </div>
                    <hr></hr>
                    <h5 className="ct-font-secondary text-center">Complete Following Questions</h5>
                    
                    <div className='ct-col'>
                        <div className='form-container'>
                            <div>
                                <div class="form-group row" style={{display:'flex'}}>
                                    <p class="col-sm-9 col-form-label ct-font-secondary-light">
                                        Do you have heart related problems?
                                    </p>
                                    <div class="col-sm-3" style={{display:'flex'}}>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inputQ1" checked={q1?true:false} onChange={() => setQ1(true)}/>
                                            <label class="form-check-label ct-font-secondary-light" for="inputQ1">Yes</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inputQ1" checked={q1?false:true} onChange={() => setQ1(false)}/>
                                            <label class="form-check-label ct-font-secondary-light" for="inputQ1">Not Yet</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row" style={{display:'flex'}}>
                                    <p class="col-sm-9 col-form-label ct-font-secondary-light">
                                        Did you check your eye sighting recently?
                                    </p>
                                    <div class="col-sm-3" style={{display:'flex'}}>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inputQ2" checked={q2?true:false} onChange={() => setQ2(true)}/>
                                            <label class="form-check-label ct-font-secondary-light" for="inputQ2">Yes</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inputQ2" checked={q2?false:true} onChange={() => setQ2(false)}/>
                                            <label class="form-check-label ct-font-secondary-light" for="inputQ2">Not Yet</label>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="text-center">
                                <button type="submit" class="btn ct-btn ct-warning" onClick={() => {
                                    let obj = {heart_issues: q1, sight: q2};
                                        profile.health = obj;
                                        updateUser(profile);
                                    }}>Update Health Information</button>
                            </div>
                        </div>
                        
                    </div>
                </div>}
            </div>

            

            {/* <MapDefault /> */}
        </>
    );
}

export default Profile;