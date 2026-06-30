// ============================================================
// Service Worker — Firebase Cloud Messaging
// Quiniela Mundial 2026 — Juárez S.A.
// ============================================================

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyCtk6xScE573NjCXaB6cNOHLbMqNxE--ys",
  authDomain:        "quiniela-los-juarez.firebaseapp.com",
  projectId:         "quiniela-los-juarez",
  storageBucket:     "quiniela-los-juarez.firebasestorage.app",
  messagingSenderId: "951834605545",
  appId:             "1:951834605545:web:3d2807b1bfe8eaa8b5fd78"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || "⚽ Quiniela Mundial 2026", {
    body:    body  || "Hay una actualización en la quiniela",
    icon:    icon  || "/icon-192.svg",
    badge:   "/icon-192.svg",
    vibrate: [200, 100, 200],
    data:    payload.data || {},
    actions: [{ action: "open", title: "Ver quiniela" }]
  });
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes("quiniela-los-juarez.vercel.app") && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow("https://quiniela-los-juarez.vercel.app");
    })
  );
});
