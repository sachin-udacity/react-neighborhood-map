/**
 * Register service worker.
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
      // register the service worker
      navigator.serviceWorker.register('/sw.js', {
          scope: '/'
      }).then(function (registration) {
        console.log('Neighborhood Map SW Registration scope: ', registration.scope);
      }, function (err) {
          console.log('Neighborhood Map SW registration failed: ', err);
      });
  } else {
      console.log("Browser doesn't support Service Workers")
  }
}