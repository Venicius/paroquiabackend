const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.credential),
  databaseURL: "https://paroquiaemilianopolis-fafaf.firebaseio.com",
});

module.exports = (request, response, next) => {
  if (request.headers.authorization) {
    console.log("if");
    admin
      .auth()
      .verifyIdToken(request.headers.authorization)
      .then(() => {
        next();
      })
      .catch(() => {
        response.status(403).send("Unauthorized");
      });
  } else {
    response.status(403).send("Unauthorized");
    return;
  }
};
