
function User (username, name, email, password, contact, address, secret, contactList, model, location, health, state){
    this.username = username;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.address = address;
    this.secret = secret;
    this.contactList = contactList;
    this.model = model;
    this.location = location;
    this.password = password;
    this.health = health;
    this.state = state;
}

User.prototype.getUsername = function(){
    return this.username;
}

User.prototype.setUsername = function(username){
    this.username = username;
}

User.prototype.getName = function(){
    return this.name;
}

User.prototype.setName = function(name){
    this.name = name;
}

User.prototype.getEmail = function(){
    this.email = email;
}

User.prototype.setEmail = function(email){
    this.email = email;
}

User.prototype.getPassword = function(){
    return this.password;
}

User.prototype.setPassword = function(password){
    this.password = password;
}

User.prototype.getState = function(){
    return this.state;
}

User.prototype.setState = function(state){
    this.state = state;
}

module.exports = User;