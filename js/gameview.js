"use strict";

import { View } from "./view.js";
import { Ball } from "./ball.js";
import { Block } from "./block.js";
import { Paddle } from "./paddle.js";
import { GameBar } from "./bar.js";

/**
 * GameViewクラス
 * @class
 */
export class GameView extends View {
  /** ボール @member {Ball} */
  #ball;
  /** ブロック @member {Block[]} */
  #blocks;
  /** パドル @member {Paddle} */
  #paddle;
  /** ゲームバー @member {GameBar} */
  #gameBar;
  /** ゲーム結果 @member {string} */
  #resultMessage = "";

  /**
   * コンストラクター
   * @param {CanvasRenderingContext2D} context コンテキスト
   */
  constructor(context) {
    super(context);

    // ボールを生成する
    this.#ball = new Ball(context, 20, 440, 5, 2, 2);

    // ブロックを生成する
    this.#blocks = [
      new Block(context, 10, 40, 52, 20),
      new Block(context, 72, 40, 52, 20),
      new Block(context, 134, 40, 52, 20),
      new Block(context, 196, 40, 52, 20),
      new Block(context, 258, 40, 52, 20),
      new Block(context, 10, 70, 52, 20),
      new Block(context, 72, 70, 52, 20),
      new Block(context, 134, 70, 52, 20),
      new Block(context, 196, 70, 52, 20),
      new Block(context, 258, 70, 52, 20),
      new Block(context, 10, 100, 52, 20),
      new Block(context, 72, 100, 52, 20),
      new Block(context, 134, 100, 52, 20),
      new Block(context, 196, 100, 52, 20),
      new Block(context, 258, 100, 52, 20),
      new Block(context, 10, 130, 52, 20),
      new Block(context, 72, 130, 52, 20),
      new Block(context, 134, 130, 52, 20),
      new Block(context, 196, 130, 52, 20),
      new Block(context, 258, 130, 52, 20),
    ];

    // パドルを生成する
    // this.#paddle = new Paddle(context, 0, 460, 320, 4, 5);
    this.#paddle = new Paddle(context, 30, 460, 40, 4, 5);

    // ゲームバーを生成する
    this.#gameBar = new GameBar(context);
  }

  /**
   * ボールと壁の衝突を検証する
   * @private
   */
  #collisionVerificationBallAndWall() {
    // キャンバスの幅と高さを取得する
    const canvasWidth = this.context.canvas.width;
    // const canvasHeight = this.context.canvas.height;

    // ボールの情報を取得する
    const { ballX, ballY, ballRadius, ballDx, ballDy } =
      this.#ball.getProperties();

    // ボールが左壁か右壁に衝突したらボールの向きを反転する
    if (
      ballX + ballDx < ballRadius ||
      canvasWidth - ballRadius < ballX + ballDx
    ) {
      this.#ball.reverseDx();
      return;
    }

    //　ボールが上壁に衝突したらボールの向きを反転する
    if (ballY + ballDy < ballRadius + 20) {
      this.#ball.reverseDy();
    }

    // ボールが下壁に衝突したらボールの向きを反転する
    // if (canvasHeight - ballRadius < ballY + ballDy) {
    //   this.#ball.reverseDy();
    // }
  }

  /**
   * ボールとブロックの衝突を検証する
   * @private
   */
  #collisionVerificationBallAndBlock() {
    // ボールの情報を取得する
    const { ballX, ballY, ballDx, ballDy, ballRadius } =
      this.#ball.getProperties();

    this.#blocks.forEach((block) => {
      if (block.status) {
        // ブロックの情報を取得する
        const { blockX, blockY, blockWidth, blockHeight } =
          block.getProperties();

        // ボールとブロックが衝突したか検証する
        if (
          blockX - ballRadius < ballX + ballDx &&
          ballX + ballDx < blockX + blockWidth + ballRadius &&
          blockY - ballRadius < ballY + ballDy &&
          ballY + ballDy < blockY + blockHeight + ballRadius
        ) {
          // ボールの向きを反転する
          this.#ball.reverseDy();
          // ブロックを非表示にする
          block.disable();
          // スコアを加算する
          this.#gameBar.addScore(Block.POINT);
        }
      }
    });
  }

  /**
   * ボールとパドルの衝突を検証する
   * @private
   */
  #collisionVerificationBallAndPaddle() {
    // ボールの情報を取得する
    const { ballX, ballY, ballDx, ballDy, ballRadius } =
      this.#ball.getProperties();

    // パドルの情報を取得する
    const { paddleX, paddleY, paddleWidth, paddleHeight } =
      this.#paddle.getProperties();

    // ボールとパドルが衝突したか検証する
    if (
      paddleX - ballRadius < ballX + ballDx &&
      ballX + ballDx < paddleX + paddleWidth + ballRadius &&
      paddleY - ballRadius < ballY + ballDy &&
      ballY + ballDy < paddleY + paddleHeight + ballRadius
    ) {
      // ボールの向きを反転する
      this.#ball.reverseDy();
    }
  }

  /**
   * パドルと壁の衝突を検証する
   * @private
   */
  #collisionVerificationPaddleAndWall() {
    // パドルの情報を取得する
    const { paddleX, paddleWidth, paddleSpeed } = this.#paddle.getProperties();

    if (this.key["ArrowLeft"] || this.key["Left"]) {
      // キーボードから左矢印キーが押されたらパドルを左に移動する
      // パドルが左壁に衝突するか検証する
      if (paddleX - paddleSpeed < 0) {
        // パドルを左壁に固定する
        this.#paddle.x = 0;
        this.#paddle.dx = 0;
      } else {
        // パドルを左に移動する
        this.#paddle.dx = -paddleSpeed;
      }
      // } else if (this.#rightPressed) {
    } else if (this.key["ArrowRight"] || this.key["Right"]) {
      // キャンバスの幅を取得する
      const canvasWidth = this.context.canvas.width;
      // キーボードから右矢印キーが押されたらパドルを右に移動する
      // パドルが右壁に衝突するか検証する
      if (canvasWidth < paddleX + paddleWidth + paddleSpeed) {
        // パドルを右壁に固定する
        this.#paddle.x = canvasWidth - paddleWidth;
        this.#paddle.dx = 0;
      } else {
        // パドルを右に移動する
        this.#paddle.dx = paddleSpeed;
      }
    } else {
      // キーボードから左矢印キーと右矢印キーが押されていない場合
      // パドルは移動しない
      this.#paddle.dx = 0;
    }
  }

  /**
   * ゲームクリアかどうかを検証する
   * @returns {boolean} ゲームクリアかどうか
   */
  #isGameClear() {
    // ブロックが全て非表示になっているか検証する
    const _isGameClear = this.#blocks.every((block) => block.status === false);
    if (_isGameClear) {
      // ゲーム結果を設定する
      this.#resultMessage = "ゲームクリア";
    }
    return _isGameClear;
  }

  /**
   * ゲームオーバーかどうかを検証する
   * @return {boolean} ゲームオーバーかどうか
   */
  #isGameOver() {
    // ボールの情報を取得する
    const { ballY, ballDy, ballRadius } = this.#ball.getProperties();
    // ボールが下壁に衝突したか検証する
    const _isGameOver =
      this.context.canvas.height - ballRadius < ballY + ballDy;
    if (_isGameOver) {
      // ゲーム結果を設定する
      this.#resultMessage = "ゲームオーバー";
    }
    return _isGameOver;
  }

  /**
   * ゲーム結果を取得する
   * @return {string} ゲーム結果
   */
  get resultMessage() {
    return this.#resultMessage;
  }

  /**
   * 更新する
   */
  update() {
    // ボールと壁の衝突を検証する
    this.#collisionVerificationBallAndWall();
    // ボールとブロックの衝突を検証する
    this.#collisionVerificationBallAndBlock();
    // ボールとパドルの衝突を検証する
    this.#collisionVerificationBallAndPaddle();
    // パドルと壁の衝突を検証する
    this.#collisionVerificationPaddleAndWall();

    // ゲームクリアかゲームオーバーか検証する
    if (this.#isGameClear() || this.#isGameOver()) {
      this.isShow = false;
    }

    // ボールの座標を更新する
    this.#ball.update();
    // パドルの座標を更新する
    this.#paddle.update();
  }

  /**
   * 描画する
   */
  draw() {
    // ゲームバーを描画する
    this.#gameBar.draw();
    // ボールを描画する
    this.#ball.draw();
    // ブロックを描画する
    this.#blocks.forEach((block) => block.draw());
    // パドルを描画する
    this.#paddle.draw();
  }
}
