firebase.auth().onAuthStateChanged(user=> {
  if (user) {    
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    gettipodeusuario(uid)
    // ...
    window.location.href="admin.html";
  }
})