const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// })

const broadcastNotification = (notification) => {
    return admin.firestore().collection('notifications').add(notification).then(doc =>
        console.log("broadcastNotification -> doc", doc)
    )
}

exports.projectCreated = functions.firestore.document('projects/{projectId}').onCreate(doc => {
    const project = doc.data()
    const notification = {
        content: 'Added a new project',
        user: `${project.authorName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return broadcastNotification(notification)
})

exports.useJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data()
        const notification = {
            content: 'Joined the party',
            user: `${newUser.authorName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return broadcastNotification(notification)

    })
})