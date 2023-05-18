const admin = require('firebase-admin')

let defaultApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY)),
})

let defaultDatabase = admin.firestore(defaultApp)

module.exports = defaultDatabase
