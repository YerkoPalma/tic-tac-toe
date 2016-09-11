<h1 align="center">Tic tac toe</h1>
<div align="center">Progressive tic tac toe game, made with choo</div>
<br />
<div align="center">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- Standard -->
  <a href="https://codecov.io/github/yoshuawuyts/choo">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
  <!-- Build -->
  <a href="https://travis-ci.org/YerkoPalma/tic-tac-toe">
    <img src="https://img.shields.io/travis/YerkoPalma/tic-tac-toe/master.svg?style=flat-square"
      alt="Build Status" />
  </a>
  <!-- Choo -->
  <a href="https://github.com/yoshuawuyts/choo">
    <img src="https://img.shields.io/badge/built%20with%20choo-v3-ffc3e4.svg?style=flat-square"
      alt="built with choo v3" />
  </a>
</div>

![image](https://cloud.githubusercontent.com/assets/5105812/18414943/bbb8811e-77b4-11e6-9a18-8d7c72164f29.png)

## Idea

The main idea is almost the same of every progressive web app, use a service worker together with a local storage system to offer a full offline experience. Now there is some limitations in this implementation that I will discuss later, but generally, the idea is to use the service worker, through the [`se-precache`](https://github.com/GoogleChrome/sw-precache) chrome library, to cache only the assets, and leave the data (the state of the [choo](https://github.com/yoshuawuyts/choo) app) to be handled with [localforage](https://github.com/localForage/localForage), which use indexDB when availaible with a fallback to webSQL for older browsers.

## Limitations

An actual limitation is that even when the app has a fast first load thanks to the offline approach, right now to use the app it currently depends on the network to be availaible, now to fully support offline work is necesary to handle the net status and define a fallback function for that situation.

## License

MIT © [Yerko Palma](https://github.com/YerkoPalma)

