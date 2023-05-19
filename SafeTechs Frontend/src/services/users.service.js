import axios from 'axios';
import Session from 'react-session-api';
import EventEmitter from '../utils/EventEmitter';
import {handleErrors} from './error_handling';
import vars from '../values/env';

// import user from '../models/Patient';


const path = vars.SERVER + "/users/users";
var user_list = [];

class UserService {

    async getUserByUsername(username, password){
        await axios.get(`${vars.SERVER}/users/${username}`).then((response)=>{
            console.log("PASS " + password + "|| response " +response.data.password);
            if(password === response.data.password){
                console.log("LOGIN COMPLETED!");

                // Load Session
                Session.set("username", username);
                Session.set("role", response.data.role);

                EventEmitter.emit("loginCompleted", {logged: true});

                return true

            } else {
                console.log("LOGIN FAILED!");
                return false;
            }
        }).catch(handleErrors);

    }

    async getUsers(){
        user_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                user_list.push(doc);
            });
            // console.log(user_list);
            // return user_list;
        }).catch(handleErrors);
        return user_list;
    }

    async getUser(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            
            obj =  response.data;
            console.log(obj);
            // response.data.forEach(doc=>{
            //     return doc;
            // });
        }).catch(handleErrors);
        return obj;
    }

    async getModelDetailsByUsername(username){
        let obj = null;
        await axios.get(`${path}/${username}/model`).then((response) => {
            console.log(response);
            obj = response;
        }).catch(handleErrors);
        return obj;
    }

    async addUser(user){

        await axios.post(path, user).then((response)=>{

        }).catch(handleErrors);
        console.log("User Entered!");
        alert("Registration Completed Now you can login.");
    }

    async updateUser(id, user){
        await axios.put(`${path}/${id}`, user).then((response)=>{

        }).catch(handleErrors);
        alert("Selected User Updated");
    }

    async deleteUser(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
        alert("Selected User Removed");
    }

    
}

export default new UserService();