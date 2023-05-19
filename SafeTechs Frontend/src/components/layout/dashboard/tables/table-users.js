import React, { useEffect, useState } from 'react';
import employee_service from '../../../../services/employee_service';
import './table.css';

const UsersTable = ({data, category}) => {

    const [users, setUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [notapprovedUsers, setNotApprovedUsers] = useState([]);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [type, setType] = useState('disconnected');

    const getUsers = async () => {
        // setUsers();
        await employee_service.getEmployees().then((users)=>{
            setUsers(users);
            console.log(users);
            users.forEach((user)=>{
                console.log(user);
                if(user.state==='disconnected'){
                    setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
                    console.log(notapprovedUsers);
                } else if(user.state==='activated'){
                    setNotApprovedUsers(notapprovedUsers=>[...notapprovedUsers, user]);
                } else if(user.state==='blocked'){
                    setBlockedUsers(blockedUsers=>[...blockedUsers, user]);
                }
            });
        }).then(()=>filterUsers(users));
        
    }

    const filterUsers = async (users) => {
        await users.forEach((user)=>{
            if(user.state==='activated'){
                approvedUsers.push(user);
                console.log(approvedUsers);
            } else if(user.state==='disconnected'){
                notapprovedUsers.push(user);
            } else if(user.state==='blocked'){
                blockedUsers.push(user);
            }
        });

        
        // console.log(notapprovedUsers);   
        // console.log(blockedUsers); 
    }

    const deleteUser = async (id) => {
        // setUsers(await officials_service.deleteOfficial(id))
        await employee_service.deleteEmployee(id)
    }

    const updateUserStatus = async (id, user, status) => {
        user.status = status;
        // setUsers(await officials_service.updateOfficial(id, user))
        await employee_service.updateEmployee(id, user);
    }
    useEffect(() => {
        
        getUsers();
        console.log(users);
        return () => {
            
        }
    }, []);
    
    return (
        <div className="container-table">
            <div className="table-heading">
                <h2 className="ct-font-secondary-light">Users Stats</h2>
                <p className="ct-font-secondary-light">Dashboard consist of necessary settings for admins and paticular management roles.</p>
                <button className="btn btn-warning" onClick={()=>setType('activated')}>PENDING USERS</button>|
                <button className="btn btn-primary" onClick={()=>setType('disconnected')}>APPROVED USERS</button>|
                <button className="btn btn-danger" onClick={()=>setType('blocked')}>BLOCKED USERS</button>|
            </div>
            <br></br>
            <div className="table-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col" className="ct-font-secondary-light">No.</th>
                        <th scope="col" className="ct-font-secondary-light">Username</th>
                        <th scope="col" className="ct-font-secondary-light">Name</th>
                        <th scope="col" className="ct-font-secondary-light">Contact</th>
                        <th scope="col" className="ct-font-secondary-light">Status</th>
                        <th scope="col" className="ct-font-secondary-light">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            type==='disconnected'&&notapprovedUsers&&notapprovedUsers.length>0?
                            notapprovedUsers.map((user)=>
                            <tr key={user.contactno}>
                                <th scope="row" className="ct-font-secondary-light">2</th>
                                <td className="ct-font-secondary-light">{user.username}</td>
                                <td className="ct-font-secondary-light">{user.name}</td>
                                <td className="ct-font-secondary-light">{user.contact}</td>
                                <th scope="col" className="ct-font-secondary-light">{user.state}</th>
                                <th scope="col" className="ct-font-secondary-light">{user.team? user.team:'Not Mentioned'}</th>
                                <th scope="col" className="ct-font-secondary-light">
                                    <button className="btn btn-success" onClick={
                                        ()=>{
                                            updateUserStatus(user.username, user, "activated"); 
                                            setNotApprovedUsers(notapprovedUsers.filter(item => item.username !== user.username)); 
                                            setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
                                        }}
                                        >ACCEPT</button>| 
                                    <button className="btn btn-info">VIEW</button>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteUser(user.contactno);
                                            setNotApprovedUsers(notapprovedUsers.filter(item => item.contactno !== user.contactno));
                                        }}
                                        >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :

                            type==='activated'&&approvedUsers&&approvedUsers.length>0?
                            approvedUsers.map((user)=>
                            <tr key={user.contactno}>
                                <th scope="row" className="ct-font-secondary-light">1</th>
                                <td className="ct-font-secondary-light">{user.username}</td>
                                <td className="ct-font-secondary-light">{user.name}</td>
                                <td className="ct-font-secondary-light">{user.contact}</td>
                                <th scope="col" className="ct-font-secondary-light">{user.state}</th>
                                <th scope="col" className="ct-font-secondary-light">
                                    <button className="btn btn-info">VIEW</button>|
                                    {/* <button className="btn btn-warning" onClick={
                                        ()=>{
                                            updateUserStatus(user.username, user, "block"); 
                                            setApprovedUsers(approvedUsers.filter(item => item.username !== user.username));
                                            setBlockedUsers(approvedUsers=>[...approvedUsers, user]);
                                        }
                                    }
                                    >BLOCK</button>| */}
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteUser(user.username);
                                            setApprovedUsers(approvedUsers.filter(item => item.username !== user.username));
                                        }}
                                    >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :

                            type==='blocked'&&blockedUsers&&blockedUsers.length>0?
                            blockedUsers.map((user)=>
                            <tr key={user.contactno}>
                                <th scope="row">1</th>
                                <td>{user.contactno}</td>
                                <td>{user.username}</td>
                                <td>{user.nic}</td>
                                <th scope="col">{user.state}</th>
                                <th scope="col">
                                    <button className="btn btn-success" onClick={
                                        ()=>{
                                            updateUserStatus(user.username, user, "activated");
                                            setBlockedUsers(blockedUsers.filter(item => item.username !== user.username));
                                            setApprovedUsers(approvedUsers=>[...approvedUsers, user]);
                                    }}
                                    >UNBLOCK</button>| 
                                    <button className="btn btn-info">VIEW</button>|
                                    <button className="btn btn-danger" onClick={
                                        ()=>{
                                            deleteUser(user.username);
                                            setBlockedUsers(blockedUsers.filter(item => item.username !== user.username));
                                    }}
                                    >REMOVE</button>
                                </th>
                            </tr>
                                )
                                :
                            <></>
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default UsersTable;