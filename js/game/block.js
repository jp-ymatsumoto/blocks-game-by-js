"use strict";

export class Block {
  context;
  /** x座標 */
  x;
  /** y座標 */
  y;
  /** 幅 */
  width;
  /** 高さ */
  height;
  /** 存在フラグ */
  status = true;
  /** 得点 */
  static POINT = 10;

  constructor(context, x, y, width, height) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /** 描画する */
  draw() {
    if (this.status === true) {
      // ブロックを描画する
      this.context.fillStyle = "#A47F61";
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
