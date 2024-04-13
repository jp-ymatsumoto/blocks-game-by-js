"use strict";

/**
 * Ballクラス
 * @class
 */
export class Ball {
  /** コンテキスト @member {CanvasRenderingContext2D} */
  #context;
  /** x座標 @member {number} */
  #x;
  /** y座標 @member {number} */
  #y;
  /** 半径 @member {number} */
  #radius;
  /** x軸の移動速度 @member {number} */
  #dx;
  /** y軸の移動速度 @member {number} */
  #dy;

  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   * @param {number} x x座標
   * @param {number} y y座標
   * @param {number} radius 半径
   * @param {number} dx x軸の移動速度
   * @param {number} dy y軸の移動速度
   */
  constructor(context, x, y, radius, dx, dy) {
    this.#context = context;
    this.#x = x;
    this.#y = y;
    this.#radius = radius;
    this.#dx = dx;
    this.#dy = dy;
  }

  /**
   * プロパティを取得する
   * @return {object} ballX, ballY, ballRadius, ballDx, ballDy
   */
  getProperties() {
    return {
      ballX: this.#x,
      ballY: this.#y,
      ballRadius: this.#radius,
      ballDx: this.#dx,
      ballDy: this.#dy,
    };
  }

  /**
   * 更新する
   */
  update() {
    this.#x += this.#dx;
    this.#y += this.#dy;
  }

  /**
   * 描画する
   */
  draw() {
    // ボールを描画する
    this.#context.beginPath();
    this.#context.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2);
    this.#context.fillStyle = "red";
    this.#context.fill();
    this.#context.closePath();
  }

  /**
   * x軸の移動速度を反転する
   */
  reverseDx() {
    this.#dx *= -1;
  }

  /**
   * y軸の移動速度を反転する
   */
  reverseDy() {
    this.#dy *= -1;
  }
}
