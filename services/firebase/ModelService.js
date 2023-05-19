const Report = require('../../models/Report');
const fire = require('./DBServe');

const db = fire.database();


const getModelInfo = async (req, res, next) => {
    console.log("Hii");
    try {
        let sensors = await db.ref('Sensor').get();
        let accident = await db.ref('accident_detect').get();
        let location = await db.ref('location').get();
        let tances = await db.ref('tancces').get();

        const report = {
            sensors,
            accident,
            location,
            tances
        };

        res.send(report);

    } catch(error) {
        res.status(500).send(error);
    }
    

}

const getModel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const report = await firestore.collection('report').doc(id);
        const data  = await report.get();

        res.send(data.data());

    } catch(error) {
        res.status(500).send(error);
    }
}

const updateReport  = async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;
        const report = await firestore.collection('report').doc(id);
        await report.update(data);
        res.send("Report Updated!");

    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getModel,
    getModelInfo,
    updateReport
}
