const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
console.log("Hello","sucess")
exports.checkflag = functions.database.ref()
.onUpdate((snapshot, context) => {
        const temptoken = 'c4VgIqxn8o0:APA91bGIXejm1XG01-udOnphkXZxebMP0M0IQ0GC-7c1tsvKHsK9z48dcgLZTsPfxEBIZB3qJtg2p2RcDZGe8U9XvR3b_seIpLK84-jeP7KybpH1Ac0wScclSxRsx2RACNLsHhpJQGhU';  
        const flag = snapshot.after.val();
        let statusMessage = `Message from the clouds as ${flag}`
        var message = {
            notification: {
                title: 'cfunction',
                body: statusMessage
            },
            token: temptoken
        };
        admin.messaging().send(message).then((response) => {
            console.log("Message sent successfully:", response);
            return response;
        })
        .catch((error) => {
            
        });
    });