const admin = require('firebase-admin')
require('dotenv').config()

const defaultDatabase = require('./firebase.js')
const busRef = defaultDatabase.collection('metro')

busRef
  .get()
  .then((snapshot) => {
    let batch = defaultDatabase.batch() // We'll use a batch to make the update operations

    snapshot.forEach((doc) => {
      const busData = doc.data()

      // Convert the ISO string to a JavaScript Date object
      const date = new Date(busData.lastPing)

      // Convert the JavaScript Date object to a Firestore Timestamp
      const timestamp = admin.firestore.Timestamp.fromDate(date)

      // Update the document in the batch
      const docRef = busRef.doc(doc.id)
      batch.update(docRef, {lastPing: timestamp})
    })

    // Commit the batch
    batch
      .commit()
      .then(() => {
        console.log('Updated all documents successfully.')
      })
      .catch((err) => {
        console.error('Error updating documents:', err)
      })
  })
  .catch((err) => {
    console.error('Error getting documents:', err)
  })
