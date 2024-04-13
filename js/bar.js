"use strict";

/**
 * Scoreクラス
 * @class
 */
export class Score {
  /** 得点 @member {number} */
  #value = 0;

  /**
   * 得点を設定する
   * @param {number} value 得点
   */
  set value(value) {
    this.#value = value;
  }

  /**
   * 得点を取得する
   * @return {number} 得点
   */
  get value() {
    return this.#value;
  }
}

/**
 * GameBarクラス
 * @class
 */
export class GameBar {
  /** コンテキスト @member {CanvasRenderingContext2D} */
  #context;
  /** スコア @member {Score} */
  #score;

  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   */
  constructor(context) {
    this.#context = context;
    this.#score = new Score();
  }

  /**
   * 得点を追加する
   * @param {number} value 得点
   */
  addScore(value) {
    this.#score.value += value;
  }

  /**
   * 描画する
   */
  draw() {
    // バーを描画する
    this.#context.fillStyle = "darkgray";
    this.#context.fillRect(0, 0, this.#context.canvas.width, 20);

    // スコアを描画する
    const scoreString = this.#score.value.toString().padStart(5, "0");
    this.#context.fillStyle = "black";
    this.#context.font = "16px Arial";
    this.#context.fillText(`Score: ${scoreString}`, 260, 10);
  }
}
