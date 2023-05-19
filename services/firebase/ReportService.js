const Report = require('../../models/Report');
const fire = require('./DBKitServe');

const firestore = fire.firestore();

const addReport = async (req, res, next) => {
    try {
        const data = await req.body;
        await firestore.collection('report').doc().set(data);
        
        res.send("Record Entered!");
    } catch(error) {
        res.status(500).send(error);
    }
}

const getReports = async (req, res, next) => {
    try {
        const reports = await firestore.collection('report');
        const data = await reports.get();
        const reportsarray = [];


        data.forEach(doc=>{
            const report = new Report(
                doc.data().id,
                doc.data().type,
                doc.data().title,
                doc.data().content,
                doc.data().issuedate
            );
            Reportsarray.push(report);
        });
        res.send(reportsarray);

    } catch(error) {
        res.status(500).send(error);
    }
    

}

const getReport = async (req, res, next) => {
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

const deleteReport = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('report').doc(id).delete();
        res.send("Report Deleted!");

    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addReport,
    getReport,
    getReports,
    updateReport,
    deleteReport
}
