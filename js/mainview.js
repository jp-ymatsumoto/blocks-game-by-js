"use strict";

import { View } from "./view.js";

/**
 * MainViewクラス
 * @class
 */
export class MainView extends View {
  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   */
  constructor(context) {
    super(context);
  }

  /**
   * キーを設定する
   * @param {object} key キー
   */
  set key(key) {
    // Enterが押されていたらMainViewを非表示にする
    if (key["Enter"]) {
      this.isShow = false;
    }
  }

  /**
   * 描画する
   */
  draw() {
    // キャンバスの幅と高さを取得する
    const canvasWidth = this.context.canvas.width;
    const canvasHeight = this.context.canvas.height;

    // タイトルを描画する
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "white";
    this.context.font = "24px sans-serif";
    this.context.fillText("ブロック崩し", canvasWidth / 2, canvasHeight / 2);

    // メッセージを描画する
    this.context.font = "16px sans-serif";
    this.context.fillText(
      "Press Enter",
      canvasWidth / 2,
      canvasHeight / 2 + 40
    );
  }
}
