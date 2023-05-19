
module.exports  = class Route {
    constructor(code, name, vendor, latlng){
        this.code = code;
        this.name = name;
        this.vendor = vendor;
        this.latlng = latlng;
    }

    getCode(){return this.code}
    getName(){return this.name}
    getVendor(){return this.vendor}
    getLatLng(){return this.latlng}

    setCode(code){this.code = code}
    setName(name){this.name = name}
    setVendor(vendor){this.vendor = vendor}
    setLatLng(latlng){this.latlng = latlng}
}