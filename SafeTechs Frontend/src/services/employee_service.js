import axios from 'axios';
import Session from 'react-session-api';
import EventEmitter from '../utils/EventEmitter';
import {handleErrors} from './error_handling';

// import Employee from '../models/Patient';


const path = "/users/employees";
var employee_list = [];

class EmployeeService {

    async getUserByUsername(username, password){
        await axios.get(`/users/${username}`).then((response)=>{
            console.log("PASS " + password + "|| response " +response.data.password);
            if(password == response.data.password){
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

    async checkExistingUsers(username){
        await axios.get(`/users/byExistUsers/${username}`).then((response)=>{
            // console.log(response.data);
            if(response.data){
                console.log("User Exists!");

                EventEmitter.emit("userexist", {exist: true});

            } else {
                console.log("User Not Existed");
            }
        }).catch(handleErrors);

    }

    async getEmployees(){
        employee_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                employee_list.push(doc);
            });
            // console.log(employee_list);
            // return employee_list;
        }).catch(handleErrors);
        return employee_list;
    }

    async getEmployee(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            
            obj =  response.data;
            console.log(obj);
        }).catch(handleErrors);
        return obj;
    }

    async addEmployee(employee){

        await axios.post(path, employee).then((response)=>{

        }).catch(handleErrors);
        console.log("User Entered!");
        alert("Registration Completed and Your details will further observed by Administrator.");
    }

    async updateEmployee(id, employee){
        await axios.put(`${path}/${id}`, employee).then((response)=>{

        }).catch(handleErrors);
        alert("Selected employee Updated");
    }

    async deleteEmployee(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Employee Removed");
    }

    
}

export default new EmployeeService();