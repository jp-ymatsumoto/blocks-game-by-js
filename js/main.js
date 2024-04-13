"use strict";

import { BlocksGame } from "./blocks.js";

/* ============================================================
  処理
============================================================ */

const game = new BlocksGame("canvas");

document.addEventListener("keydown", (event) => {
  game.setKeydown(event.key);
});

document.addEventListener("keyup", (event) => {
  game.setKeyup(event.key);
});
