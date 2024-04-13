"use strict";

/**
 * Blockクラス
 * @class
 */
export class Block {
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
  /** 表示フラグ @member {boolean} */
  #status = true;
  /** 獲得ポイント @member {number} @static */
  static POINT = 10;

  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   * @param {number} x x座標
   * @param {number} y y座標
   * @param {number} width 幅
   * @param {number} height 高さ
   */
  constructor(context, x, y, width, height) {
    this.#context = context;
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;
  }

  /**
   * プロパティを取得する
   * @return {object} blockX, blockY, blockWidth, blockHeight
   */
  getProperties() {
    return {
      blockX: this.#x,
      blockY: this.#y,
      blockWidth: this.#width,
      blockHeight: this.#height,
    };
  }

  /**
   * 表示フラグを取得する
   * @return {boolean} 表示フラグ
   */
  get status() {
    return this.#status;
  }

  /**
   * 表示する
   */
  enable() {
    this.#status = true;
  }

  /**
   * 非表示にする
   */
  disable() {
    this.#status = false;
  }

  /**
   * 描画する
   */
  draw() {
    if (this.#status) {
      // ブロックを描画する
      this.#context.fillStyle = "#A47F61";
      this.#context.fillRect(this.#x, this.#y, this.#width, this.#height);
    }
  }
}
