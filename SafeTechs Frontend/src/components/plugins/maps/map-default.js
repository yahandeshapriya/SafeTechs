import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap, DirectionsRenderer } from "react-google-maps"
import './maps.css';
import usersService from '../../../services/users.service';
import Session from 'react-session-api';
import gas from './icons/fire.png';
import fire from './icons/fire-solid.png';
import drink from './icons/wine.png';
import health from './icons/bed.png';
import weatherService from '../../../services/weather.service';

const Map = (props) => {
    const locations = ["Galle", "Kandy"];
    const [markers, setMarkers] = useState([]);
    const [user, setUser] = useState();
    const [model, setModel] = useState(null);
    const [modelInfo, setModelInfo] = useState(false);
    const [selected, setSelected] = useState(null);
    const [weatherList, setWeatherList] = useState([]);
    const [directions, setDirectios] = useState(null);

    const [place1 , setPlace1] = useState(null);
    const [place2 , setPlace2] = useState(null);
    const [place3 , setPlace3] = useState(null);
    const [place4 , setPlace4] = useState(null);
    const [place5 , setPlace5] = useState(null);
    const [place6 , setPlace6] = useState(null);
    const [place7 , setPlace7] = useState(null);

    var [username, setUsername] = useState(Session.get("username")||null);
    var [userrole, setRole] = useState(Session.get("role")||null);
    var [relative, setRelative] = useState(null);


    const getMyPosition = async () => {
      console.log("H6");
      await usersService.getModelDetailsByUsername("sample").then((result) => {
        console.log(result.data.location.Latitude);
        setModel(result.data);
      })
    }

    const getWeather = async (loc) => {
      await weatherService.getLocationsWeather(loc).then(async (data) => {
        console.log(data);
        if(!place1){setPlace1(data.data); return;}
      })
    }

    const getWeather2 = async (loc) => {
      await weatherService.getLocationsWeather(loc).then(async (data) => {
        console.log(data);
        if(!place2){setPlace2(data.data); return;}
        
      })
    }

    const getWeather3 = async (loc) => {
      await weatherService.getLocationsWeather(loc).then(async (data) => {
        console.log(data);
        if(!place3){setPlace3(data.data); return;}
      })
    }

    const getWeather4 = async (loc) => {
      await weatherService.getLocationsWeather(loc).then(async (data) => {
        console.log(data);
        if(!place4){setPlace4(data.data); return;}
      })
    }

    const getWeather5 = async (loc) => {
      await weatherService.getLocationsWeather(loc).then(async (data) => {
        if(!place5){setPlace5(data.data); return;}
      })
    }

    const getWeatherBulk = async (locs) => {
      locs.forEach(async (loc) => {
          await weatherService.getLocationsWeather(loc).then(async (data) => {
            console.log(data.data);
            await setWeatherList(d => [...d, data.data]);
            
          })
      })
    }

    const getPersonDetails = async (rel) => {
      console.log(rel);
      await usersService.getUser(rel).then((user) => {
        setRelative(user);
        console.log(user);
        if(user.model&&user.model!==""){
          console.log(user.model);
          getMyPosition();
        }
        // if(user.health){
            
        // }
    })
    }

    // const handleActiveMarker = (marker) => {
    //   if (marker === selected) {
    //     return;
    //   }
    //   setSelected(marker);
    // };

    

    useEffect(() => {
      getWeather("Colombo");
      getWeather2("Kandy");
      getWeather3("Jaffna");
      getWeather4("Galle");
      getWeather5("Matara");

      if(userrole&&userrole==="Family Member"){
        getPersonDetails(Session.get("relative"));
      } if(userrole&&userrole==="Authority Person"){
        getMyPosition();
      } if(userrole&&userrole==="User"){
        getMyPosition();
      }
      // getMyPosition();
      return () => {
        
      }
    })



    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 6.9271, lng: 79.8612}}
        >
            {props.directions && <DirectionsRenderer directions={directions} />}

            {/* {
              mylocLat&&mylocLng&&(
                <Marker position={{ lat:mylocLat, lng: mylocLng}} draggable 
                onDrag={(e)=>{setMyLocLat(e.latLng.lat()); setMyLocLng(e.latLng.lng()); console.log(mylocLat+"||"+mylocLng)}}/>
              )
            } */}

            {
              weatherList&&weatherList.length>0&&weatherList.map((value) => 
              <Marker position={{ lat:weatherList.coords.lat, lng: weatherList.coords.lat.lon}}  />)
            }

            {
              place1&&place1.coord&&<Marker position={{ lat:place1.coord.lat, lng: place1.coord.lon}} 
              icon={`http://openweathermap.org/img/w/${place1.weather[0].icon}.png`}>
                
              </Marker>
            }
            {
              place2&&place2.coord&&<Marker position={{ lat:place2.coord.lat, lng: place2.coord.lon}} 
              icon={`http://openweathermap.org/img/w/${place2.weather[0].icon}.png`}>
                
              </Marker>
            }
            {
              place3&&place3.coord&&<Marker position={{ lat:place3.coord.lat, lng: place3.coord.lon}} 
              icon={`http://openweathermap.org/img/w/${place3.weather[0].icon}.png`}>
                
              </Marker>
            }
            {
              place4&&place4.coord&&<Marker position={{ lat:place4.coord.lat, lng: place4.coord.lon}} 
              icon={`http://openweathermap.org/img/w/${place4.weather[0].icon}.png`}>
                
              </Marker>
            }
            {
              place5&&place5.coord&&<Marker position={{ lat:place5.coord.lat, lng: place5.coord.lon}} 
              icon={`http://openweathermap.org/img/w/${place5.weather[0].icon}.png`}>
                
              </Marker>
            }

            
            

            {
              model&&model.accident===1&&model.location&&model.location.Latitude&&model.location.Longitude&&model.accident===1&&(
                <Marker
                onClick={() => {setModelInfo(!modelInfo); console.log(place1)}} 
                position={{ lat:parseFloat(model.location.Latitude), lng: parseFloat(model.location.Longitude)}} >
                  {modelInfo&&<InfoWindow >
                    <div>
                      <h4 className='ct-font-secondary'>Reported Accident</h4>
                      <small className='ct-font-secondary'>Include Following Warnings</small>
                      {model&&model.sensors&&<div key={1} className='ct-flex'>
                        {model.sensors&&model.sensors.fire===1&&<div className='map-card'>
                          <img src={fire} alt="LOGO" height="50"/>
                        </div>}
                        {model.sensors&&model.sensors.gas===1&&<div key={2} className='map-card'>
                          <img src={gas} alt="LOGO" height="50"/>
                        </div>}
                        {model.sensors&&model.sensors.alcohol===1&&<div key={3} className='map-card'>
                          <img src={drink} alt="LOGO" height="50"/>
                        </div>}
                      </div>}
                    </div>
                    
                  </InfoWindow>}
                </Marker>
              )
            }
            

            {/* {
              selectedMarker && 
              (<Marker position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lng}} draggable onClick={(e)=>{console.log("HII")}}/>)
            } */}

            {/* {
              selectedMarker && (<InfoWindow  onCloseClick={()=>{setSelectedMarker(null)}}
                position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lng}}>
                  <div>Marker Info</div>
              </InfoWindow>)
            } */}
  
            
              {/* <InfoWindow /> */}

            {/* <InfoWindow position={{lat: loc[0], lng: loc[1]}} /> */}
            
            {/* {
                setSelectedMarker&&(
                <infowindow position={{lat: 6.9271, lng: 79.8612}}>
                    <h4>Location Pointer</h4>
                </infowindow>
                )
            } */}
            
        </GoogleMap>
    );

}

const WrapMap = withScriptjs(withGoogleMap(Map));

const MapDefault = () =>{

    return (
        <>
            <div style={{width:"100%", height:"90vh", overflow:'hidden'}}>
                <WrapMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDAsJYZSQ92_NQAz9kiSpW1XpyuCxRl_uI"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>

            {/* <SidePanel /> */}
        </>
    );
}

export default MapDefault;
