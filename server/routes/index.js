var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY)),
});

let defaultDatabase = admin.getFirestore(defaultApp);

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express Server Test!'});
});

/* Ping the server from base stations. */
router.post('/ping', function (req, res) {
  let data = req.body;

  // Get a database reference to the collection of busses
  let bussesRef = defaultDatabase.collection('busses');

  // Get the database reference to the bus with the given ID
  let busRef = bussesRef.doc(data.id);

  //We will update the bus's last ping location and time
  busRef.update({
    lastPing: admin.firestore.Timestamp.now(),
    lastLongitude: data.longitude,
    lastLatitude: data.latitude,
    route: data.route,
  });

  // Send a response to the base station
  res.send('OK');
});

module.exports = router;
