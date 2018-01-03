importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "components/board.js",
    "revision": "8a83764c9dadb80a9fb7e271d434931e"
  },
  {
    "url": "index.js",
    "revision": "1f50e2e55604326667a98691c9aa92e0"
  },
  {
    "url": "package.json",
    "revision": "09a419145210610396f07040e440f100"
  },
  {
    "url": "server.js",
    "revision": "b7c0901ce73d572405bf3d5da80c40b5"
  },
  {
    "url": "stores/game.js",
    "revision": "8b7ba2b33744ac2a66c8590af9de5092"
  },
  {
    "url": "style.css",
    "revision": "e3f0e68edcec3a3a5703705d797dc1c3"
  },
  {
    "url": "views/game.js",
    "revision": "a7bf876e4b94e3b3a4520df4021952dd"
  },
  {
    "url": "views/main.js",
    "revision": "54d7b45c1794da821cf1164bf6b29936"
  },
  {
    "url": "views/notFound.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
