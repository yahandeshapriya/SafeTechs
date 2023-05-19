import axios from 'axios';
import {handleErrors} from './error_handling';
// import transport from '../models/transport';


const path = "/transports";
var transport_list = [];

class TransportService {

    async getTransports(){
        transport_list = [];
        await axios.get(path).then((response)=>{
            transport_list = [];
            response.data.forEach(doc=>{
                transport_list.push(doc);
            });
        });
        return transport_list;
    }

    async getTransport(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            obj = response.data;
        });
        return obj;
    }

    async getTransportsByCategory(category){
        transport_list = [];
        await axios.get(`${path}/byCategory/${category}`).then((response)=>{
            
            response.data.forEach(doc=>{
                transport_list.push(doc);
            });
        });
        return transport_list;
    }

    async addTransport(transport){
        console.log("User Ging to Enter!");
        await axios.post(path, transport).then((response)=>{

        })
        console.log("User Entered!");
        alert("Registration Completed and Your details will further observed by Administrator.")
    }

    async updateTransport(id, transport){
        await axios.put(`${path}/${id}`, transport).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Transport Updated");
    }

    async deleteTransport(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Transport Removed");
    }
    
}



export default new TransportService();