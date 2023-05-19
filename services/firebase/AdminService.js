const Admin = require('../../models/Admin');
const fire = require('./DBKitServe');

const firestore = fire.firestore();

const addAdmin = async (req, res, next) => {
    try {
        const data = await req.body;
        await firestore.collection('admin').doc().set(data);
        
        res.send("Record Entered!");
    } catch(error) {
        res.status(500).send(error);
    }
}

const getAdmins = async (req, res, next) => {
    try {
        const admins = await firestore.collection('admin');
        const data = await admins.get();
        const adminsarray = [];

        data.forEach(doc=>{
            const admin = new Admin(
                doc.data().username,
                doc.data().eamil,
                doc.data().password,
                doc.data().name,
                doc.data().contact,
                doc.data().service,
                doc.data().state
            )
            adminsarray.push(admin);
        });

        res.send(adminsarray);

    } catch(error) {
        res.status(500).send(error);
    }
    

}

const getAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const admin = await firestore.collection('admin').doc(id);
        const data  = await admin.get();

        res.send(data.data());

    } catch(error) {
        res.status(500).send(error);
    }
}

const updateAdmin  = async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;
        const admin = await firestore.collection('admin').doc(id);
        await admin.update(data);
        res.send("Admin Updated!");

    } catch(error) {
        res.status(500).send(error);
    }
}

const deleteAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('admin').doc(id).delete();
        res.send("Admin Deleted!");

    } catch(error) {

    }
}

module.exports = {
    addAdmin,
    getAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin
}
