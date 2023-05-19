import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import {handleErrors} from './error_handling';
import vars from '../values/env';

// import admin from '../models/Patient';


const path = vars.SERVER+"/users/admins";
var admin_list = [];

class AdminService {

    

    async getAdmins(){
        admin_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                admin_list.push(doc);
            });
            // console.log(admin_list);
            // return admin_list;
        }).catch(handleErrors);
        return admin_list;
    }

    async getAdmin(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            
            obj =  response.data;
            // response.data.forEach(doc=>{
            //     return doc;
            // });
        }).catch(handleErrors);
        return obj;
    }

    async addAdmin(admin){

        await axios.post(path, admin).then((response)=>{

        }).catch(handleErrors);
        console.log("User Entered!");
        alert("Registration Completed and Your details will further observed by Administrator.");
    }

    async updateAdmin(id, admin){
        await axios.put(`${path}/${id}`, admin).then((response)=>{

        }).catch(handleErrors);
        alert("Selected admin Updated");
    }

    async deleteAdmin(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Admin Removed");
    }

    
}

export default new AdminService();