const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data: { email: string; }, context: any) => {
  return admin.auth().getUserByEmail(data.email).then((user: { uid: string; }) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has succesfully been added as admin!`
    }
  }).catch((err: any) => {
    return err;
  });
});