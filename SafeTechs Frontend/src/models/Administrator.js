import User from "./User";

class Administrator extends User{
    constructor(username, email, password, name, contact, service){
        super(username, email, password);
        this.name = name;
        this.contact = contact;
        this.service = service;
    }

    getName(){return this.name}
    getContact(){return this.contact}
    getAddress(){return this.address}
    getRank(){return this.rank}
    getAuth(){return this.auth}

    setName(name){this.name = name}
    setContact(contact){this.contact = contact}
    setAddress(address){this.address = address}
    setRank(rank){this.rank = rank}
    setAuth(auth){this.auth = auth}
}

export default Administrator;