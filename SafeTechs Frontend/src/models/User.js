
class User {
    constructor(username, name, password, email, address, secret, contactList, model, location, contact, health, state){
        this.username = username;
        this.name = name; 
        this.password = password;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.secret = secret; 
        this.contactList = contactList;
        this.model = model;
        this.location = location;
        this.health = health;
        this.state = state || 'disconnected';
    }
}

export default User;