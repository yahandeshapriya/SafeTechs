const User = require('../../models/User');
const session = require('express-session');
const fire = require('./DBKitServe');

const firestore = fire.firestore();

const addUser = async (req, res, next) => {
    try {
        const data = await req.body;

        // Correction
        var temp = data.password;
        data.password = data.email;
        data.email = temp;

        await firestore.collection('user').doc().set(data);
        
        res.send("Record Entered!");
    } catch(error) {
        res.status(500).send(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('user');
        const data = await users.get();
        const usersarray = [];
        console.log("LV02");

        data.forEach(doc=>{
            
            const user = new User(
                doc.data().username,
                doc.data().name,
                doc.data().email,
                doc.data().password,
                doc.data().contact,
                doc.data().address,
                doc.data().secret,
                doc.data().contactList,
                doc.data().model,
                doc.data().location,
                doc.data().state || 'disconnected'
                
            );
            usersarray.push(user);
        });
        res.send(usersarray);

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
    

}

const getUser = async (req, res, next) => {
    console.log("USER"+req.params.id);
    try {
        const id = req.params.id;
        const user = await firestore.collection('user').where('username', '==', id).get();
        var data;
        user.forEach((doc) => {
            data = doc.data();
            console.log(data);
            res.send(data);
        });

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getUserByUsername = async (req, res, next) => {
    console.log("LV 01");
    try {
        const username = req.params.id;
        
        const patient = await firestore.collection('user').where('username', '==', username);
        var data  = await patient.get();
        console.log("LV 02");
        data.forEach(doc=>{
            console.log("LV 03");
            if(doc.status!=="disconnected"){
                console.log(doc.data());
                // req.session.username = req.body.regUsername;
                // req.session.role = "User";
                res.send({password:doc.data().password, role:"User"});
            } else {
                console.log("LV 05");
                res.status(203).send({message: 'User not Authorized'});
            }
            
        });
        
        const expert = await firestore.collection('admin').where('username', '==', username);
        data  = await expert.get();
        data.forEach(doc=>{
            res.send({password:doc.data().password, role:"Authority Person"});
        });


    } catch(error) {
        res.status(500).send(error);
    }
}

const updateUser  = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const required = await firestore.collection('user').where('username', '==', id).get();
        required.forEach(async (doc)=>{
            await firestore.collection('user').doc(doc.id).update(data);
        })
        // const user = await firestore.collection('user').doc(id);
        // await user.update(data);
        res.send("User Updated!");

    } catch(error) {
        res.status(500).send(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('user').doc(id).delete();
        res.send("User Deleted!");

    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addUser,
    getUser,
    getUserByUsername,
    getUsers,
    updateUser,
    deleteUser
}
