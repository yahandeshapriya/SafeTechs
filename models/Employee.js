const User = require("./User");

module.exports = class Employee extends User{
    constructor(username, email, password, name, staffid, pulsecode, team, age, contact, address, distance, route, state, location){
        super(username, name, email, password, state);
        this.staffid = staffid;
        this.pulsecode = pulsecode;
        this.team = team;
        this.age = age;
        this.contact = contact;
        this.address = address;
        this.distance = distance;
        this.route = route;
        this.state = state;
        this.location = location;
    }

    getStaffID(){return this.staffid}
    getPulseCode(){return this.pulsecode}
    getTeam(){return this.team}
    getAge(){return this.age}
    getProfession(){return this.profession}
    getContact(){return this.contact}
    getAddress(){return this.address}
    getDistance(){return this.distance}
    getRoute(){return this.route}
    getState(){return this.state}
    getLocation(){return this.location}

    setStaffID(staffid){this.staffid = staffid}
    setPulseCode(pulsecode){this.pulsecode = pulsecode}
    setTeam(team){this.team = team}
    setAge(age){this.age = age}
    setProfession(profession){this.profession = profession}
    setContact(contact){this.contact = contact}
    setAddress(address){this.address = address}
    setDistance(distance){this.distance = distance}
    setRoute(route){this.route = route}
    setState(state){this.state = state}
}