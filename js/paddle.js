"use strict";

/**
 * Paddleクラス
 * @class
 */
export class Paddle {
  /** コンテキスト @member {CanvasRenderingContext2D} */
  #context;
  /** x座標 @member {number} */
  #x;
  /** y座標 @member {number} */
  #y;
  /** 幅 @member {number} */
  #width;
  /** 高さ @member {number} */
  #height;
  /** x軸の移動速度 @member {number} */
  #dx = 0;
  /** 移動速度 @member {number} */
  #speed;

  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   * @param {number} x x座標
   * @param {number} y y座標
   * @param {number} width 幅
   * @param {number} height 高さ
   * @param {number} speed 移動速度
   */
  constructor(context, x, y, width, height, speed) {
    this.#context = context;
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;
    this.#speed = speed;
  }

  /**
   * プロパティを取得する
   * @return {object} paddleX, paddleY, paddleWidth, paddleHeight, paddleSpeed
   */
  getProperties() {
    return {
      paddleX: this.#x,
      paddleY: this.#y,
      paddleWidth: this.#width,
      paddleHeight: this.#height,
      paddleSpeed: this.#speed,
    };
  }

  /**
   * x軸の移動速度を設定する
   * @param {number} value x軸の移動速度
   */
  set dx(value) {
    this.#dx = value;
  }

  /**
   * 更新する
   */
  update() {
    this.#x += this.#dx;
  }

  /**
   * 描画する
   */
  draw() {
    // パドルを描画する
    this.#context.beginPath();
    this.#context.rect(this.#x, this.#y, this.#width, this.#height);
    this.#context.fillStyle = "green";
    this.#context.fill();
    this.#context.closePath();
  }
}
