"use strict";

import { View } from "./view.js";

/**
 * ResultViewクラス
 * @class
 */
export class ResultView extends View {
  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   */
  constructor(context) {
    super(context);
  }

  /**
   * 描画する
   * @param {string} message ゲーム結果
   */
  draw(message) {
    // キャンバスの幅と高さを取得する
    const canvasWidth = this.context.canvas.width;
    const canvasHeight = this.context.canvas.height;

    // タイトルを描画する
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "white";
    this.context.font = "24px sans-serif";
    this.context.fillText(message, canvasWidth / 2, canvasHeight / 2);
  }
}
