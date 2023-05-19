const Route = require('../../models/Route');
const fire = require('./DBServe');

const firestore = fire.firestore();

const addRoute = async (req, res, next) => {
    try {
        const data = await req.body;
        await firestore.collection('route').doc().set(data);
        
        res.send("Record Entered!");
    } catch(error) {
        res.status(500).send(error);
    }
}

const getRoutes = async (req, res, next) => {
    try {
        const routes = await firestore.collection('route');
        const data = await routes.get();
        const routesarray = [];


        data.forEach(doc=>{
            const route = new Route(
                doc.id,
                `${doc.data().origin} - ${doc.data().destination}`,
                doc.data().vendor,
                doc.data().stops
            );
            routesarray.push(route);
        });
        res.send(routesarray);

    } catch(error) {
        res.status(500).send(error);
    }
    

}

const getRoute = async (req, res, next) => {
    try {
        const id = req.params.id;
        const route = await firestore.collection('route').doc(id);
        const data  = await route.get();

        res.send(data.data());

    } catch(error) {
        res.status(500).send(error);
    }
}

const updateRoute  = async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;
        const route = await firestore.collection('route').doc(id);
        await route.update(data);
        res.send("Route Updated!");

    } catch(error) {
        res.status(500).send(error);
    }
}

const deleteRoute = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('route').doc(id).delete();
        res.send("Route Deleted!");

    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addRoute,
    getRoute,
    getRoutes,
    updateRoute,
    deleteRoute
}
