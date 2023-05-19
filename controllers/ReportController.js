const { getReport, getReports, addReport, updateReport, deleteReport } = require('../services/firebase/ReportService');

module.exports = (app) => {
    app.route('/reports').get(getReports).post(addReport);
    app.route('/reports/:id').get(getReport).put(updateReport).delete(deleteReport);
}