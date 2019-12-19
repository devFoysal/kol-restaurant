importScripts("https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.4.0/firebase-messaging.js");

import { getFCMMessage } from "../src/helper";

if (firebase.messaging.isSupported()) {
  var firebaseConfig = {
    messagingSenderId: "24234234234"
  };
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log(payload);
    getFCMMessage(payload);
    // console.log(" Received background message ", payload);

    // Notification.requestPermission().then(permission => {
    //   if (permission === "granted") {
    //     console.log("Notification permission granted.");
    //   } else {
    //     console.log("Unable to get permission to notify.");
    //   }
    // });

    // var sender = JSON.parse(payload.data.message);
    // var notificationTitle = "CometChat Pro Notification";
    // var notificationOptions = {
    //   body: payload.data.alert,
    //   icon: sender.data.entities.sender.entity.avatar
    // };

    console.log("notification", notificationOptions);
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
  self.addEventListener("notificationclick", function(event) {
    event.notification.close();
  });
}
