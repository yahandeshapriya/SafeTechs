import React, { useEffect, useState } from 'react';
// import { register } from 'react-scroll/modules/mixins/scroller';
import employee_service from '../../../services/employee_service';
import admin_service from '../../../services/admin_service';
import EventEmitter from '../../../utils/EventEmitter';
import './popup.css'
import StaffMember from '../../../models/StaffMember';
import Administrator from '../../../models/Administrator';
import User from '../../../models/User';
import usersService from '../../../services/users.service';

function Register() {

    var [expState, setExpState] = useState(false);
    var [patState, setPatState] = useState(false);

    // Patient Form ==============================================================================================================================
    var [username, setUsername] = useState('');    
    var [name, setName] = useState('');
    var [staffCode, setStaffCode] = useState('');
    var [staffTeam, setTeam] = useState('');
    var [name, setName] = useState('');
    var [address, setAddress] = useState('');
    var [contact, setContact] = useState('');
    var [email, setEmail] = useState('');
    var [pass, setPass] = useState('');
    var [cpass, setCpass] = useState('');    
    
    // var sm_state = false;

    var patStateMange = () => {
        setPatState(!patState);
    }
    var expStateMange = () => {
        setExpState(!expState);
    }

    var [sm_uname, setSMUname] = useState(null);
    var [sm_name, setSMName] = useState(null);
    var [sm_address, setSMAddress] = useState(null);
    var [sm_contact, setSMContact] = useState(null);
    var [sm_email, setSMEmail] = useState(null);
    var [sm_pass, setSMPass] = useState(null);
    var [sm_cpass, setSMCpass] = useState(null);


    // Validations
    const validateName = (answer) => {if(!answer){setSMName("Can't keep your Full name as a Empty field");} else setSMName(null);}
    const validateUname = async (answer) => {if(!answer){setSMUname("Can't keep your Username as a Empty field");} else setSMUname(null); employee_service.checkExistingUsers(answer);}
    const validateAddress = (answer) => {if(!answer){setSMAddress("Better if you give address of yours");} else setSMAddress(null);}
    const validateContact = (answer) => {if(!answer){setSMContact("Better if you give address of yours");} else setSMContact(null); if(answer.length!==10){setSMContact("Enter Valid Contact Number");} else setSMContact(null);}
    const validateEmail = (answer) => {if(!answer){setSMEmail("Can't keep your Email as a Empty field");} else setSMEmail(null)}
    const validatePass = (answer) => {if(!answer){setSMPass("Can't keep your Password as a Empty field");} else setSMPass(null); if(answer.length<8){setSMPass("Enter Valid Password");} else setSMPass(null);}
    const validateCpass = (answer) => {if(!answer){setSMCpass("Can't keep your Confirm Password as a Empty field");} else setSMCpass(''); if(answer!== pass){setSMCpass("Confirm password doesn't match");}else setSMCpass(null);}
    
    

    const onRegisterUser = async () => {
        if(sm_uname||sm_name||sm_address||sm_contact||sm_email||sm_pass||sm_cpass) {console.log("Errors"); return;}
        if(username||name||address||contact||email||pass||cpass) {
            const employee = new User(username, name, email, pass, address, {}, [], '', {}, contact, {}, "NEW");
            await usersService.addUser(employee);
        } else {
            console.log("Errors"); return;
        }
        
    }

    // Expert Form =============================================================================================================================
    var [username_ex, setUsernameEx] = useState('');    
    var [name_ex, setNameEx] = useState('');
    var [prof_ex, setProfEx] = useState('');
    var [cat, setCat] = useState('');
    var [address_ex, setAddressEx] = useState('');
    var [contact_ex, setContactEx] = useState('');
    var [email_ex, setEmailEx] = useState('');
    var [pass_ex, setPassEx] = useState('');
    var [cpass_ex, setCpassEx] = useState('');

    var [sm_uname_ex, setSMUnameEx] = useState(null);
    var [sm_name_ex, setSMNameEx] = useState(null);
    var [sm_prof_ex, setSMProfEx] = useState(null);
    var [sm_contact_ex, setSMContactEx] = useState(null);
    var [sm_email_ex, setSMEmailEx] = useState(null);
    var [sm_pass_ex, setSMPassEx] = useState(null);
    var [sm_cpass_ex, setSMCpassEx] = useState(null);

    // Validations
    const validateExName = (answer) => {if(!answer){setSMNameEx("Can't keep your Full name as a Empty field");} else setSMNameEx(null);}
    const validateExUname = (answer) => {if(!answer){setSMUnameEx("Can't keep your Username as a Empty field");} else setSMUnameEx(null);}
    const validateExProf = (answer) => {if(!answer){setSMProfEx("Can't keep your Proffesion as a Empty field");} else setSMProfEx(null);}
    const validateExContact = (answer) => {if(!answer){setSMContactEx("Better if you give address of yours");} else setSMContactEx(null); if(answer.length!==10){setSMContactEx("Enter Valid Contact Number");} else setSMContactEx(null);}
    const validateExEmail = (answer) => {if(!answer){setSMEmailEx("Can't keep your Email as a Empty field");} else setSMEmailEx(null)}
    const validateExPass = (answer) => {if(!answer){setSMPassEx("Can't keep your Password as a Empty field");} else setSMPassEx(null); if(answer.length<8){setSMPassEx("Enter Valid Password");} else setSMPassEx(null);}
    const validateExCpass = (answer) => {if(!answer){setSMCpassEx("Can't keep your Confirm Password as a Empty field");} else setSMCpassEx(''); if(answer!== pass_ex){setSMCpassEx("Confirm password doesn't match");}else setSMCpassEx(null);}
    
    


    const onRegisterExpert = () => {
        if(sm_uname_ex||sm_name_ex||sm_contact_ex||sm_email_ex||sm_pass_ex||sm_cpass_ex) {console.log("Errors"); return;}
        const admin = new Administrator(username_ex, email_ex, pass_ex, name_ex, contact_ex, prof_ex);
        admin_service.addAdmin(admin);
    }

    useEffect(() => {
        const checkUsername = () => {alert("Username already Exist!");}
        const listner = EventEmitter.addListener("userexist", checkUsername)
        return () => {
            listner.remove();
        }
    })

    return (
        <>
            <div className="form-col text-center"  >
                {
                    !patState?
                        <>
                            <i class="fas fa-user-md ct-font-em" onClick={patStateMange}></i><br></br>
                            <h1 className="ct-font-secondary" >As a Vehicle Owner</h1>  
                        </>
                        :
                        <>
                            <h4 className="ct-font-secondary" >Vehicle Owner Registration</h4>  
                            <form onSubmit={(event)=>{event.preventDefault(); onRegisterUser();}}>
                                <div class="form-group ct-input-padding-fix">
                                    {/* <label for="inputusername">Full Name</label> */}
                                    <input 
                                        onChange={(event)=>{setName(event.target.value); validateName(event.target.value);}}
                                        type="text" class="form-control" id="inputname" placeholder="Enter Full Name"
                                    />
                                        <small className="form-text text-muted ct-font-secondary">{sm_name}</small>
                                </div>
                                <div className="hr-spacer"></div>
                                <div class="form-group ct-input-padding-fix">
                                    {/* <label for="inputusername">Username</label> */}
                                    <input 
                                        onChange={(event)=>{setUsername(event.target.value); validateUname(event.target.value);}}
                                        type="text" class="form-control" id="inputusername" placeholder="Prefered Username"
                                    />
                                    <small className="form-text text-muted ct-font-secondary">{sm_uname}</small>
                                </div>
                                <div className="hr-spacer"></div>
                                <div class="form-group ct-input-padding-fix">
                                    <input 
                                        onChange={(event)=>{setAddress(event.target.value); validateAddress(event.target.value);}}
                                        type="text" class="form-control" id="inputaddress" placeholder="Your Address"
                                    />
                                    <small className="form-text text-muted ct-font-secondary">{sm_address}</small>
                                </div>
                                <div className="hr-spacer"></div>
                                <div class="form-row ct-flex">
                                    <div class="col">
                                        <input 
                                            onChange={(event)=>{setContact(event.target.value); validateContact(event.target.value);}}
                                            type="text" class="form-control" id="inputcontact" placeholder="Your Contact Number"
                                        />
                                        <small className="form-text text-muted ct-font-secondary">{sm_contact}</small>
                                    </div>
                                    <div class="col">
                                        <input 
                                            onChange={(event)=>{setEmail(event.target.value); validateEmail(event.target.value);}}
                                            type="text" class="form-control" placeholder="Your Email"
                                        />
                                        <small className="form-text text-muted ct-font-secondary">{sm_email}</small>
                                    </div>
                                </div>
                                <div className="hr-spacer"></div>
                                <div class="form-row ct-flex">
                                    <div class="col">
                                        <input 
                                            onChange={(event)=>{setPass(event.target.value); validatePass(event.target.value);}}
                                            type="password" class="form-control" id="inputpass" placeholder="Password"
                                        />
                                        <small className="form-text text-muted ct-font-secondary">{sm_pass}</small>
                                    </div>
                                    <div class="col">
                                        <input 
                                            onChange={(event)=>{setCpass(event.target.value); validateCpass(event.target.value);}}
                                            type="password" class="form-control" id="inputcpass" placeholder="Confirm Password"
                                        />
                                        <small className="form-text text-muted ct-font-secondary">{sm_cpass}</small>
                                    </div>
                                </div>
                                <div className="hr-spacer"></div>
                                <div className="text-center">
                                    <button type="submit" class="btn ct-btn ct-success">Register</button>
                                </div>
                            </form>  
                        </>
                }
                                      
            </div>

            <div className="ct-flex-br">
                |
            </div>
                                        
                                        
            <div className="form-col text-center">
                {
                    !expState?
                        <>
                            <i class="fas fa-user-md ct-font-em" onClick={expStateMange}></i><br></br>
                            <h1 className="ct-font-secondary">As a Authority Person</h1>
                        </>
                        :
                        <>
                            <h4 className="ct-font-secondary" >Authority Registration</h4>    
                            <form onSubmit={(event)=>{event.preventDefault(); onRegisterExpert();}}>
                                <div class="form-group ct-input-padding-fix">
                                    {/* <label for="inputusername">Full Name</label> */}
                                    <input 
                                        onChange={(event)=>{setNameEx(event.target.value); validateExName(event.target.value);}}
                                        type="text" class="form-control" id="inputexname" placeholder="Enter Full Name"
                                    />
                                        <small className="form-text text-muted ct-font-secondary">{sm_name_ex}</small>
                                </div>
                                <div className="hr-spacer"></div>
                                <div class="form-group ct-input-padding-fix">
                                    {/* <label for="inputusername">Username</label> */}
                                    <input 
                                        onChange={(event)=>{setUsernameEx(event.target.value); validateExUname(event.target.value);}}
                                        type="text" class="form-control" id="inputexusername" placeholder="Prefered Username"
                                    />
                                        <small className="form-text text-muted ct-font-secondary">{sm_uname_ex}</small>
                                </div>
                                <div className="hr-spacer"></div>
                                
                                <div class="form-group ct-input-padding-fix">
                                    <label for="exampleFormControlSelect1" className="ct-font-secondary">Select your Field</label>
                                    <select class="form-control" id="exampleFormControlSelect1"
                                        onChange={(event)=>{setProfEx(event.target.value); validateExProf(event.target.value);}}
                                    >
                                    <option className='ct-font-secondary' value="Fire Force">Fire Force</option>
                                    <option className='ct-font-secondary' value="Ambulence Service">Ambulence Service</option>
                                    <option className='ct-font-secondary' value="Police Force">Police Force</option>
                                    </select>
                                    <small className="form-text text-muted ct-font-secondary">{sm_prof_ex}</small>     
                                </div>
                                <div className="hr-spacer"></div>
                                <div className="hr-spacer"></div>
                                
                                <div className="hr-spacer"></div>
                                <div class="form-row ct-flex">
                                    <div class="col">
                                    <input 
                                        onChange={(event)=>{setContactEx(event.target.value); validateExContact(event.target.value);}}
                                        type="text" class="form-control" id="inputexcontact" placeholder="Your Contact Number"
                                    />
                                    <small className="form-text text-muted ct-font-secondary">{sm_contact_ex}</small>
                                    </div>
                                    <div class="col">
                                    <input 
                                        onChange={(event)=>{setEmailEx(event.target.value); validateExEmail(event.target.value);}}
                                        type="text" class="form-control" placeholder="Your Email"
                                    />
                                    <small className="form-text text-muted ct-font-secondary">{sm_email_ex}</small>
                                    </div>
                                </div>
                                <div className="hr-spacer"></div>
                                <div class="form-row ct-flex">
                                    <div class="col">
                                    <input 
                                        onChange={(event)=>{setPassEx(event.target.value); validateExPass(event.target.value);}}
                                        type="password" class="form-control" id="inputexpass" placeholder="Password"
                                    />
                                    <small className="form-text text-muted ct-font-secondary">{sm_pass_ex}</small>
                                    </div>
                                    <div class="col">
                                    <input 
                                        onChange={(event)=>{setCpassEx(event.target.value); validateExCpass(event.target.value);}}
                                        type="password" class="form-control" id="inputexcpass" placeholder="Confirm Password"
                                    />
                                    <small className="form-text text-muted ct-font-secondary">{sm_cpass_ex}</small>
                                    </div>
                                </div>
                                <div className="hr-spacer"></div>
                                <div className="text-center">
                                    <button type="submit" class="btn ct-btn ct-success">Register</button>
                                </div>
                            </form>  
                        </>
                }
                
            </div>

        </>
    )
}

export default Register;
