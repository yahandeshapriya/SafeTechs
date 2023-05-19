class Transportation {
    constructor(code, route, type, driver){
        this.code = code;
        this.route = route;
        this.type = type;
        this.driver = driver;
    }

    getCode(){return this.code}
    getRoute(){return this.route}
    getType(){return this.type}
    getDriver(){return this.driver}

    setCode(code){this.code = code}
    setRoute(route){this.route = route}
    setType(type){this.type = type}
    setDriver(driver){this.stops = driver}
}

export default Transportation;