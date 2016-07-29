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

## Overview

```
                                                              App
                                                               +
                                                               |
                                                               |
                                                               v
                                                         +-----+-----+         +------------+
                                                         |  Initial  |  No     | Load  from |
                                                         |data loaded+-------->+  firebase  |
                                                         +-----+-----+         +------------+
                                                               |
                                               +           Yes |
                                               |               |
                                               |               v
                                               |         +-----+-----+
                                               |         | Load from |
                                               |         |  localDB  |
                             Service Worker    |         +-----+-----+
                                   +           |               |
                                   |           |               |
                                   |           |               v
                             +-----+----+      |         +-----+-----+
                             | SW cache +----------------+Register SW|
                             |  assets  |      |         +-----+-----+
                             +-----+----+      |               |
                                   |           |     +---------+-----------+
                                   v           |     |                     |
                             +-----+-----+     |     v                     v
                             | SW update |     |  +--+----+            +---+---+
                             |   cache   |     |  |Request|            |Request|
                             +-----+-----+     +  |  data |            | cache |
                                   |              +-------+            +-------+
                             +-----+-----+
                             |           |
                             v           v
                          +--+--+     +--+---+
                          |fetch|     |fetch |
                          |data |     |assets|
                          +-----+     +------+
                          
```
