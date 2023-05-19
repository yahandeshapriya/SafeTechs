const User = require("./User");

module.exports = class Admin extends User{
    constructor(username, email, password, name, code, contact, state){
        super(username, name, email, password, state);
        this.code = code;
        this.contact = contact;
    }

    getCode(){return this.code}
    getContact(){return this.contact}

    setCode(code){this.code = code}
    setContact(contact){this.contact = contact}
}