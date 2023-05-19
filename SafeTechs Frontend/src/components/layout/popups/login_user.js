import React, { useEffect, useState } from 'react';
import './popup.css';
import { AiFillCloseSquare } from 'react-icons/ai';
import Session from 'react-session-api';
import EventEmitter from '../../../utils/EventEmitter';
import Register from './register_user';
import usersService from '../../../services/users.service';

function Login(props){

    var form_state = props.formSwap;

    // Form Values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [member, setMember] = useState(false);

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState(null);

    const getUsers = async () => {
        await usersService.getUsers().then((users) => {
            setUsers(users);
            // console.log(users);
        })
    }


    const swapPannel = () => {
        EventEmitter.emit("swapPannel", {swap:true});
    }

    const closeLogPannel = () => {
        EventEmitter.emit("closePannel", {close:true});
        
    }

    const onLogin = async (username, pass) => {
        await usersService.getUserByUsername(username, pass).then(result=>{
            console.log("USA - " + Session.get("username"));
        });
        
    }

    const onMemberLogin = async (username, password) => {
        if(selected&&selected.length>0){
            console.log(selected[0].contactList);
            if(selected[0].contactList&&selected[0].contactList.length>0){
                selected[0].contactList.forEach((data) => {
                    console.log(data);
                    if(data.user===username&&data.password ===password){
                        Session.set("username", username);
                        Session.set("role", "Family Member");
                        Session.set("relative", selected[0].username);

                        EventEmitter.emit("loginCompleted", {logged: true});
                    }
                })
            } else {
                alert("No Relative has added under this User");
            }
        } else {
            alert("Need to select your Relative first");
        }

    }

    useEffect(() => {
        getUsers();
        var listner = EventEmitter.addListener('loginCompleted', closeLogPannel);
        return () => {
            listner.remove();
        }
    },[])

    return (
            <div className="ct-popup-box">
                <div className="ct-close" onClick={closeLogPannel} ><AiFillCloseSquare/></div>
                
                {
                    form_state?
                        <>
                            <div className="ct-pupup-head text-center">

                                <h1 className="ct-font-secondary">{member?'MEMBER LOGIN':'LOGIN'}</h1>
                                <p>Some Description</p>

                                </div>

                                <div className="ct-popup-body text-left ct-flex">

                                {!member&&<div className="form-col">
                                <form onSubmit={(event)=>{event.preventDefault(); onLogin(username, password);}}>
                                    
                                    <div class="form-group ">
                                        <label for="inputusername">Username</label>
                                        <input 
                                            onChange={(event)=>setUsername(event.target.value)}
                                            type="text" class="form-control" id="inputusername" placeholder="Enter Username"
                                        />
                                        <small id="emailHelp" className="form-text text-muted ct-font-secondary">Use Username that was given by you in Registration.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputpassword">Password</label>
                                        <input
                                            onChange={(event)=>setPassword(event.target.value)}
                                            type="password" class="form-control" id="inputpassword" placeholder="Enter Password"
                                        />
                                    </div>
                                    
                                    <div className="text-center">
                                    <button type="submit" class="btn ct-btn ct-success">Login</button>
                                    </div>
                                </form>
                                </div>}

                                {member&&<div className="form-col">
                                <form onSubmit={(event)=>{event.preventDefault(); onMemberLogin(username, password);}}>

                                    <div class="form-group ">
                                        <label for="inputusername">Select User (Your Family Relative)</label>
                                        <select class="form-control" onChange={(e) => {
                                            setSelected(users.filter(d => d.username===e.target.value));
                                            console.log(selected);
                                        } }>
                                            <option value={''}>---Select---</option>
                                            {users&&users.length>0&&users.map((item)=><option className="ct-font-secondary" value={item.username}>{item.name}</option>)}
                                            
                                        </select>
                                        <small id="emailHelp" className="form-text text-muted ct-font-secondary">Select your Relative.</small>
                                    </div>
                                    <div class="form-group ">
                                        <label for="inputusername">Member Name (Provided)</label>
                                        <input 
                                            onChange={(event)=>setUsername(event.target.value)}
                                            type="text" class="form-control" id="inputusername" placeholder="Enter Username"
                                        />
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="inputpassword">Member Password</label>
                                        <input
                                            onChange={(event)=>setPassword(event.target.value)}
                                            type="password" class="form-control" id="inputpassword" placeholder="Enter Password"
                                        />
                                    </div>
                                    
                                    <div className="text-center">
                                    <button type="submit" class="btn ct-btn ct-success">Login</button>
                                    </div>
                                </form>
                                </div>}

                                <div className="ct-flex-br">
                                |
                                </div>
                                        
                                        
                                <div className="form-col">
                                <h1 className="ct-font-secondary">Welcome to Sri Lanka's First Automated Vehicle Accident Detection & Alerting System </h1>
                                <p className="ct-font-secondary">Switch to {!member?'family Member':"User"} <a href="#" onClick={() => setMember(!member)}>Login</a></p>
                                <p className="ct-font-secondary">Haven't got an <a href="#" onClick={swapPannel}>Account</a>?</p>
                                </div>



                            </div>
                        </>
                        :
                        <>
                            <div className="ct-pupup-head text-center">

                                <h1 className="ct-font-secondary">Choose Your Role</h1>
                                <p>Some Description</p>

                            </div>

                            <div className="ct-popup-body text-left ct-flex">

                                <Register/>

                            </div>
                            <div className="text-center">
                                <p className="ct-font-secondary">Hava an <a onClick={swapPannel}>Account</a>?</p>
                            </div>
                        </>
                }

            </div>
    ); 
}

export default Login;
