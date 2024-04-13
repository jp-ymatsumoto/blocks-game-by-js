"use strict";

import { MainView } from "./mainview.js";
import { GameView } from "./gameview.js";
import { ResultView } from "./resultview.js";

/**
 * BlocksGameクラス
 * @class
 */
export class BlocksGame {
  /** キャンバス @member {HTMLCanvasElement} */
  #canvas;
  /** コンテキスト @member {CanvasRenderingContext2D} */
  #context;
  /** インターバルID @member {number} */
  #intervalId = null;
  /** インターバルの時間(ミリ秒) @member {number} */
  #intervalMs = 1000 / 60;
  /** ビューの名前 @member {string} */
  #viewname = "";
  /** MainView @member {MainView} */
  #mainView;
  /** GameView @member {GameView} */
  #gameView;
  /** ResultView @member {ResultView} */
  #resultView;

  /**
   * コンストラクター
   * @param {string} canvasId キャンバスID
   */
  constructor(canvasId) {
    this.#canvas = document.getElementById(canvasId);
    if (this.#canvas === null) {
      throw new Error("canvas要素が取得できません");
    }
    this.#context = this.#canvas.getContext("2d");

    this.#mainView = new MainView(this.#context, true);
    this.#gameView = new GameView(this.#context, true);
    this.#resultView = new ResultView(this.#context, true);

    this.#viewname = this.#mainView.constructor.name;

    this.start();
  }

  /**
   * インターバルを開始する
   */
  start() {
    // インターバルが既に開始している場合は何もしない
    if (this.#intervalId !== null) {
      return;
    }
    // インターバルを開始する
    this.#intervalId = setInterval(() => {
      this.#run();
    }, this.#intervalMs);
  }

  /**
   * インターバルを停止する
   */
  stop() {
    // インターバルが既に停止している場合は何もしない
    if (this.#intervalId === null) {
      return;
    }
    // インターバルを停止する
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  /**
   * 実行する
   */
  #run() {
    switch (this.#viewname) {
      // MainViewの時の処理
      case "MainView":
        // ゲーム開始前のゲーム画面を描画する
        this.#gameView.draw();
        // メイン画面を描画する
        this.#mainView.draw();
        // メイン画面が非表示になったらゲーム画面を表示する
        if (this.#mainView.isShow === false) {
          this.#viewname = this.#gameView.constructor.name;
        }
        break;
      // GameViewの時の処理
      case "GameView":
        // 画面をクリアする
        this.#clearDisplay();
        // ゲームの状態を更新する
        this.#gameView.update();
        // ゲーム画面を描画する
        this.#gameView.draw();
        // ゲーム画面が非表示になったらリザルト画面を表示する
        if (this.#gameView.isShow === false) {
          this.#viewname = this.#resultView.constructor.name;
        }
        break;
      // ResultViewの時の処理
      case "ResultView":
        // リザルト画面を描画する
        this.#resultView.draw(this.#gameView.resultMessage);
        // インターバルを停止する
        this.stop();
        break;
    }
  }

  /**
   * キーを押した時の処理
   * @param {string} key キー
   */
  setKeydown(key) {
    switch (this.#viewname) {
      // MainViewの時の処理
      case "MainView":
        this.#mainView.key = { [key]: true };
        break;
      // GameViewの時の処理
      case "GameView":
        this.#gameView.key = { [key]: true };
        break;
    }
  }

  /**
   *　キーを離した時の処理
   * @param {string} key キー
   */
  setKeyup(key) {
    switch (this.#viewname) {
      // GameViewの時の処理
      case "GameView":
        this.#gameView.key = { [key]: false };
        break;
    }
  }

  /**
   * 画面をクリアする
   * @private
   */
  #clearDisplay() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }
}
