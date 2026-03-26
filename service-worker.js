
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async (event) => {
  const data = event.data || {};

  if (data.type === "MOSTRAR_NOTIFICACION") {
    await self.registration.showNotification("Avisos", {
      body: data.body || "Tenés un recordatorio",
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/avisos-app/");
    })
  );
});
