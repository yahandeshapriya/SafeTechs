import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {useMatch} from 'react-router-dom';
import queryString from 'query-string';
import sampleData from '../layout/dashboard/table/employee-route/sample.json';
import DirectionRenderComponent from "./DirectionRenderComponent";
import { G_API_URL, latLngConverter } from "../../utility/constants";
import DummyLocations from "../../utility/dummyLocations";
import getPromisedMarkers from "../../utility/locations";
import employee_service from "../../services/employee_service";
import route_service from "../../services/route_service";
import Route from "../../models/Route";
import EventEmitter from "../../utils/EventEmitter";
import {Marker, Polygon, Circle } from 'react-google-maps';
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

// const getRoutes = async () => {
//   var routes = await route_service.getRoutes();
//   const locations = {
//     Horana: latLngConverter("6.718564559, 80.0696375", "Horana"),
//     Pokunuwita: latLngConverter("6.72065296, 80.019727022", "Stop 01"),
//     Stop02: latLngConverter("6.76702180, 80.01852539", "Stop 02"),
//     Stop03: latLngConverter("6.78577264, 79.98676803", "Stop 03"),
//     Stop04: latLngConverter("6.78577264, 79.98676803", "Stop 04"),
//     Stop05: latLngConverter("6.8784932983, 79.873643190", "Stop 05")
//   };

//   return locations;
// }
class Directions extends Component {
  state = {
    defaultZoom: 12,
    map: null,
    center: {
      lat: 6.9271,
      lng: 79.8612
    },
    origin: {
      lat: null,
      lng: null
    },
    destination: {
      lat: null,
      lng: null
    },
    route: [],
    routes: [],
    id: 1,
    settledRoutes: [],
    waypointCount: 0,
    userMarkers: [],
    isSaveRoutes: false
  };
  
  customLoad = async () => {
    console.log("Launch Custom Load!");
    await getPromisedMarkers().then((loc)=>console.log(loc));
  }

  passengersLoad = async () => {
    console.log("Passengers Load");
    // await employee_service.getEmployees().then((users)=>console.log(users));
    var response = await employee_service.getEmployees();
    this.setState({userMarkers: response});
    console.log(this.state.userMarkers);
  }

  onRouteSave = () => {
    // FirStore Save Action for Routes
    console.debug("ONSAVE load!");
    if(this.state.route.length>1){
      var route = new Route("456", "ORIGIN", "DESTINATION", this.state.route);
      route_service.addRoute(route);
    }
  }

  onRouteLoad = async () => {
    // FirStore Get Routes
    console.debug("ONLoad load!");
    await route_service.getRoutes().then((docs)=>{
      docs.forEach((doc)=>{this.setState({routes: [...this.state.routes, doc]});});
    });
  }

  onSelectedRouteLoad = async (id) => {
    let data = sampleData[id-1];
    console.log(data);
  }

  componentDidMount(){
    const {route} = queryString.parse(window.location.search);
    this.passengersLoad();
    this.onRouteLoad();
    this.onSelectedRouteLoad(parseInt(route));
  }
  
  render() {
    
    
    return (
      <>
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(6.9271, 79.8612)}
        onClick={
          (e) => {
            if(this.state.origin.lat&&this.state.origin.lng){
              this.setState({destination: {lat:e.latLng.lat(), lng:e.latLng.lng()}});
              console.log("This is Destination");
            } else {
              this.setState({origin: {lat:e.latLng.lat(), lng:e.latLng.lng()}}); 
              console.log("This is Origin");
            }
            this.state.route.push({lat:e.latLng.lat(), lng:e.latLng.lng()});
          }
        }
      >

        {
          this.state.userMarkers&&this.state.userMarkers.length>0&&this.state.userMarkers.map(
            (user)=>user.location?<Marker position={{ lat:user.location.lat, lng: user.location.lng}}/>:null)
        }

        {
          this.state.origin.lat&&this.state.origin.lng&&(<Marker position={{ lat:this.state.origin.lat, lng: this.state.origin.lng}}/>)
        }

        {
          this.state.destination.lat&&this.state.destination.lng&&(<Marker position={{ lat:this.state.destination.lat, lng: this.state.destination.lng}}
          />)
        }

        {/* <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={[{ lat: 6.9271, lng: 79.8612 },
              { lat: 6.8980, lng: 79.9223 },
              { lat: 6.9907, lng: 79.8932 }]}
            // Event used when manipulating and adding points
            // onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            // onDragEnd={onEdit}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          /> */}

        {DummyLocations.map((elem, index) => {
          return (
            <DirectionRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={elem.from}
              to={elem.to}
            />
          );
        })}

        {
          this.state.routes&&this.state.routes.length>0&&this.state.routes.map((elem, index) => 
          elem.latlng&&elem.latlng.length>0&&elem.latlng.map((e, index) =>
          index!==0&&<DirectionRenderComponent
          key={index}
          index={index + 1}
          strokeColor={"#f68f54"}
          from={{lat:elem.latlng[index-1].lat, lng:elem.latlng[index-1].lng, fromTitle: `STOP ${this.state.waypointCount}`}}
          to={{lat:e.lat, lng:e.lng, fromTitle: `STOP ${this.state.waypointCount}`}}
          />
          ))
        }

        {this.state.route&&this.state.route.length>0&&this.state.route.map((elem, index) => {
          console.log("Index - " + index);
          if(index!==index-1){
          return (
            <DirectionRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={{lat:elem.lat, lng:elem.lng, fromTitle: `STOP ${this.state.waypointCount}`}}
              to={{lat:this.state.destination.lat, lng:this.state.destination.lng, fromTitle: `STOP ${this.state.waypointCount}`}}
            />
          );}
        })}
      </GoogleMap>
      <div className="map-pannel">
                <div className="control-area">
                    <div className="control" onClick={()=>this.onRouteLoad()}>
                        <div className="icon">
                            <i class="fas fa-road"></i>
                        </div>
                        <div className="text">
                            <small>ROUTE MANAGE</small>
                        </div>
                    </div>
                    <div className="control" onClick={()=>null}>
                        <div className="icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="text">
                            <small>MARKER MANAGE</small>
                        </div>
                    </div>
                    <div className="control" onClick={()=>this.onRouteSave()}>
                        <div className="icon">
                            <i class="fas fa-save"></i>
                        </div>
                        <div className="text">
                            <small>SAVE</small>
                        </div>
                    </div>
                </div>
      </div>
      </>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);
