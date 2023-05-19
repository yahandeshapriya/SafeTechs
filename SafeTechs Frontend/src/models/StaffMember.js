import User from "./User";

class StaffMember extends User{
    constructor(username, email, password, name, contact, address, proffesion, staffID){
        super(username, email, password);
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.profession = proffesion;
        this.staffID = staffID;
    }

    getName(){return this.name}
    getProfession(){return this.profession}
    getContact(){return this.contact}
    getAddress(){return this.address}
    getStaffID(){return this.staffID}

    setName(name){this.name = name}
    setProfession(profession){this.profession = profession}
    setContact(contact){this.contact = contact}
    setAddress(address){this.address = address}
    setStaffID(staffID){this.staffID = staffID}
}

export default StaffMember;