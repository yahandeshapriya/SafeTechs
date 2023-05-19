import axios from 'axios';
import {handleErrors} from './error_handling';
// import route from '../models/route';


const path = "/routes";
var route_list = [];

class RouteService {

    async getRoutes(){
        route_list = [];
        await axios.get(path).then((response)=>{
            route_list = [];
            response.data.forEach(doc=>{
                route_list.push(doc);
            });
        });
        return route_list;
    }

    async getRoute(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            obj = response.data;
        });
        return obj;
    }

    async getRoutesByCategory(category){
        route_list = [];
        await axios.get(`${path}/byCategory/${category}`).then((response)=>{
            
            response.data.forEach(doc=>{
                route_list.push(doc);
            });
        });
        return route_list;
    }

    async addRoute(route){
        console.log("User Ging to Enter!");
        await axios.post(path, route).then((response)=>{

        })
        console.log("User Entered!");
        alert("Route has Added to DB")
    }

    async updateRoute(id, route){
        await axios.put(`${path}/${id}`, route).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Route Updated");
    }

    async deleteRoute(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Route Removed");
    }
    
}



export default new RouteService();