"use strict";

/**
 * Viewクラス
 * @class
 */
export class View {
  /** コンテキスト @member {CanvasRenderingContext2D} */
  #context;
  /** キー @member {object} */
  #key = {};
  /** 表示フラグ @member {boolean} */
  #isShow = true;

  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   */
  constructor(context) {
    this.#context = context;
  }

  /**
   * コンテキストを取得する
   * @return {CanvasRenderingContext2D} コンテキスト
   */
  get context() {
    return this.#context;
  }

  /**
   * キーを取得する
   * @return {object} キー
   */
  get key() {
    return this.#key;
  }

  /**
   * キーを設定する
   * @param {object} key キー
   */
  set key(key) {
    this.#key = key;
  }

  /**
   * 表示フラグを取得する
   * @return {boolean} 表示フラグ
   */
  get isShow() {
    return this.#isShow;
  }

  /**
   * 表示フラグを設定する
   * @param {boolean} isShow 表示フラグ
   */
  set isShow(isShow) {
    this.#isShow = isShow;
  }
}
