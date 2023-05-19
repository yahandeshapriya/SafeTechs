const fire = require('firebase');
const conf = require('../../settings/db-main');

const db2 = fire.initializeApp(conf.firebaseConfig2, 'Main');

module.exports = db2;

