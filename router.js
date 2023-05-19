const express = require('express');
const router = express.Router();


const ENV = require('./settings/env');

// router.get('/', (req, res)=>{
//     res.send("Sever Up");
// })

module.exports = (app) => {

    const env = new ENV();

    app.get('/', (req, res, next)=>{
        console.log(req.body);
    })

    // USER CONTROLLER
    require('./controllers/UserController')(app);


    // REPORT CONTROLLER
    require('./controllers/ReportController')(app);

    app.use((req, res, next)=>{
        const error = new Error('Page Not Found');
        error.status = 404;
        next(error);
    })

    app.use((error, req, res, next)=>{
        res.status(error.status || 5000);
        res.json({
            error: {
                message: error.message
            }
        });
    })
    
}