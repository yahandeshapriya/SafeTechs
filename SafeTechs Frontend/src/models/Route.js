
class Route {
    constructor(code, origin, destination, stops, time){
        this.code = code;
        this.origin = origin;
        this.destination = destination;
        this.stops = stops;
        this.time = time;
    }

    getCode(){return this.code}
    getOrigin(){return this.origin}
    getDestination(){return this.destination}
    getStops(){return this.stops}
    getTime(){return this.time}

    setCode(code){this.code = code}
    setOrigin(origin){this.origin = origin}
    setDestination(destination){this.destination = destination}
    setStops(stops){this.stops = stops}
    setTime(time){this.time = time}
}

export default Route;