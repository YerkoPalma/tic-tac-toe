<h1 align="center">Tic tac toe</h1>
<div align="center">(WIP) Progressive tic tac toe game, made with choo</div>
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

## TODO

- Record users if they don't exists
- Record matches when they finish
- Update data when games finish
- Add board to `board` view including, wins, loses and rank
  - Create the user-info component
  - Create the effects to update
  - Update from firebase
  - Update from indexedDb
- Add top 5 users in `main` view including username, wins, loses, last-connection
  - Create the board component
  - Create the effects to update
  - Update from firebase
  - Update from indexedDb 
