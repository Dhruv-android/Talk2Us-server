const functions = require('firebase-functions');

const admin = require('firebase-admin');
const { database } = require('firebase-admin');
admin.initializeApp();
exports.checkflag = functions.database.ref('/chatMessages/')
.onUpdate((snapshot, context) => {
        const temptoken = 'c4VgIqxn8o0:APA91bGIXejm1XG01-udOnphkXZxebMP0M0IQ0GC-7c1tsvKHsK9z48dcgLZTsPfxEBIZB3qJtg2p2RcDZGe8U9XvR3b_seIpLK84-jeP7KybpH1Ac0wScclSxRsx2RACNLsHhpJQGhU';  
        const flag = snapshot.after.val();
        let statusMessage = ``
        
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
exports.newChatStablised=functions.database.ref('/counsellorChats/{counsellorId}')
.onUpdate((snapshot,context)=>{
    const cid=context.params.counsellorId
    const count=snapshot.after.numChildren()
    const parent =snapshot.after.ref.parent.parent.child('Counsellor').child(cid).child('clients')
    return parent.set(count);
});