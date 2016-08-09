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
                +----------------------------+   +------------------------------------------------+
                |Service worker              |   | App                                            |
                +----------------------------+   +------------------------------------------------+
                |                            |   |                                                |
                |       +----------+         |   |     +------------+        +------------+       |
                |       | SW cache |         |   |     | Local data |        |Asynchronous|       |
                |       |  assets  |         |   |     |    load    +--+ +---+  data load |       |
                |       +----+-----+         |   |     +------------+  | |   +------------+       |
                |            |               |   |                     | |                        |
                |       +----+-----+         |   |                     | |                        |
                |       | SW update|         |   |                +----+-+----+                   |
                |       |   cache  |         |   |           +----+Register SW+-----+             |
                |       +----+-----+         |   |           |    +-----------+     |             |
                |            |               |   |           |                      |             |
                |            |               |   |           |                      |             |
                |      +-----+------+        |   |           |                +-----+----+        |
                |      |Fetch assets|        |   |     +-----+------+         | Reply on |        |
                |      | on request |        |   |     |Request data|         |local data|        |
                |      +------------+        |   |     +------------+         +----------+        |
                |                            |   |                                                |
                +----------------------------+   +------------------------------------------------+

```
