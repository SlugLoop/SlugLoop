var express = require('express');
var router = express.Router();
require('dotenv').config();

var admin = require('firebase-admin');

let defaultApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY)),
});

let defaultDatabase = admin.firestore(defaultApp);

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express Server Test!'});
});

router.get('/ping', function (req, res) {
  res.send('OK');
});

/* Ping the server from base stations. */
router.post('/ping', function (req, res) {
  let data = JSON.parse(req.body.data);
  data = data[0];

  // Get a database reference to the collection of busses
  let bussesRef = defaultDatabase.collection('busses');

  // Get the database reference to the bus with the given ID
  let busRef = bussesRef.doc(data.id);

  //We will update the bus's last ping location and time
  busRef.set({
    lastPing: new Date().toISOString(),
    lastLongitude: data.lon,
    lastLatitude: data.lat,
    route: data.route,
  });

  // Send a response to the base station
  res.send('OK');
});

module.exports = router;
