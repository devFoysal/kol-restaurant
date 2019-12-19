import firebase from "firebase/app";
import "firebase/messaging";

export function initializeFirebase() {
  if (firebase.messaging.isSupported()) {
    const firebaseConfig = {
      apiKey: "AIzaSyATFb48zOVkgD7F0l_k6bv58nl4sJ5iNs0",
      authDomain: "kole-application.firebaseapp.com",
      databaseURL: "https://kole-application.firebaseio.com",
      projectId: "kole-application",
      storageBucket: "kole-application.appspot.com",
      messagingSenderId: "737498888975",
      appId: "1:737498888975:web:50d8d2cc8904f0c3819c7a",
      measurementId: "G-RQKLYK3EEY"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const messaging = firebase.messaging();

    // Add the public key generated from the console here.
    messaging.usePublicVapidKey(
      "BCVTu7QCq_KFug_Fdpc-jpRK62w6efiVJwEeubPKz8ddGdjbXH1qV-7lg_S3M11seaP1tYmd5v2iQ7iHxRPmd7M"
    );

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getRegToken();
      } else {
        console.log("Unable to get permission to notify.");
      }
    });

    function getRegToken() {
      messaging
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            sendTokenToServer(currentToken);
          } else {
            // Show permission request.
            console.log("No Instance ID token available. Request permission to generate one.");
            // Show permission UI.
            setTokenSentToServer(false);
          }
        })
        .catch(err => {
          console.log("An error occurred while retrieving token. ", err);
          showToken("Error retrieving Instance ID token. ", err);
          setTokenSentToServer(false);
        });
    }

    function sendTokenToServer(currentToken) {
      if (!isTokenSentToServer()) {
        console.log("Sending token to server...");
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
      } else {
        console.log("Token already sent to server so won't send it again " + "unless it changes");
      }
    }

    function setTokenSentToServer(sent) {
      window.localStorage.setItem("sentToServer", sent ? "1" : "0");
    }

    function isTokenSentToServer() {
      return window.localStorage.getItem("sentToServer") === "1";
    }

    function showToken(currentToken) {
      // Show token in console and UI.
      const tokenElement = document.querySelector("#token");
      tokenElement.textContent = currentToken;
    }

    messaging.onMessage(payload => {
      console.log("Message received. ", payload);
    });

    // messaging
    //   .requestPermission()
    //   .then(() => {
    //     console.log("Permission granted");
    //     return messaging.getToken();
    //   })
    //   .then(token => {
    //     console.log(token);
    //   })
    //   .catch(error => {
    //     if (error.code === "messaging/permission-blocked") {
    //       console.log("Please Unblock Notification Request Manually");
    //     } else {
    //       console.log("Error Occurred", error);
    //     }
    //   });

    //     messaging.onMessage(payload => {
    //       console.log("fcm payload", payload);
    //       var sender = JSON.parse(payload.data.message);
    //       console.log("Receiving foreground message", JSON.parse(payload.data.message));
    //       // Customize notification here
    //       if (sender.data.entities.sender.entity.uid !== firebaseUid) {
    //         var notificationTitle = "CometChat Pro Notification";
    //         var notificationOptions = {
    //           body: payload.data.alert,
    //           icon: sender.data.entities.sender.entity.avatar
    //         };
    //         var notification = new Notification(notificationTitle, notificationOptions);
    //         notification.onclick = function(event) {
    //           notification.close();
    //           console.log(event);
    //         };
    //       }
    //     });
    //   }
  }

  // export function updateLoggedInUser(uid) {
  //   if (firebase.messaging.isSupported()) {
  //     firebaseUid = uid;
  //   }
}
