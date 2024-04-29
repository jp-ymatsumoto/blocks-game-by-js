# ブロック崩しゲーム

canvas を使用したブロック崩しゲームです。JavaScript の学習コンテンツで、HTML,CSS,JavaScript で実装しています。

## v1

### 技術スタック

- JavaScript の基本構文（変数、配列、分岐処理、繰り返し処理、関数、クラス）
- DOM とイベント（keydown イベント、keyup イベント）
- canvas

### 画面

![アプリ画像](images/v1.png)

### クラス図

<details>
<summary>ブロック崩し（ビュー関連）</summary>

```mermaid
---
title: ブロック崩し（ビュー関連）
---
classDiagram
  class ブロック崩し {
    -キャンバス
    -コンテキスト
    -インターバルID : number
    -インターバルの時間 : number
    -ビューの名前 : string
    -メインビュー : MainView
    -ゲームビュー : GameView
    -リザルトビュー : ResultView
    +コンストラクター(コンテキスト) void
    +インターバルを開始する() void
    +インターバルを停止する() void
    +キーを押した時の処理(キー) void
    +キーを話した時の処理(キー) void
    -実行する() void
    -画面をクリアする() void
  }
  class ビュー {
    -コンテキスト
    -キー : object
    -表示フラグ : boolean
    +コンストラクター(コンテキスト) void
    +コンテキストを取得する() : コンテキスト
    +キーを取得する() object
    +キーを設定する(キー) void
    +表示フラグを取得する() boolean
    +表示フラグを設定する(表示フラグ) void
  }
  class メインビュー {
    +コンストラクター(コンテキスト) void
    +キーを設定する(キー) void
    +描画する() void
  }
  class ゲームビュー {
    -ボール : Ball
    -ブロック : Block[]
    -パドル : Paddle
    -ゲームバー : GameBar
    -ゲーム結果 : string
    +コンストラクター(コンテキスト) void
    -ボールと壁の衝突を検証する() void
    -ボールとブロックの衝突を検証する() void
    -ボールとパドルの衝突を検証する() void
    -パドルと壁の衝突を検証する() void
    -ゲームクリアかどうかを検証する() boolean
    -ゲームオーバーかどうかを検証する() boolean
    +ゲーム結果を取得する() string
    +更新する() void
    +描画する() void
  }
  class リザルトビュー {
    +コンストラクター(コンテキスト) void
    +描画する(ゲーム結果) void
  }

ブロック崩し "1" -- "1" メインビュー
ブロック崩し "1" -- "1" ゲームビュー
ブロック崩し "1" -- "1" リザルトビュー
メインビュー--|>ビュー
ゲームビュー--|>ビュー
リザルトビュー--|>ビュー
```

</details>

<details>
<summary>ブロック崩し（ゲーム本体）</summary>

```mermaid
---
title: ブロック崩し（ゲーム本体）
---
classDiagram
  class ゲームビュー {
    -ボール : Ball
    -ブロック : Block[]
    -パドル : Paddle
    -ゲームバー : GameBar
    -ゲーム結果 : string
    +コンストラクター(コンテキスト) void
    -ボールと壁の衝突を検証する() void
    -ボールとブロックの衝突を検証する() void
    -ボールとパドルの衝突を検証する() void
    -パドルと壁の衝突を検証する() void
    -ゲームクリアかどうかを検証する() boolean
    -ゲームオーバーかどうかを検証する() boolean
    +ゲーム結果を取得する() string
    +更新する() void
    +描画する() void
  }

  class ボール {
    -コンテキスト
    -x座標 : number
    -y座標 : number
    -半径 : number
    -x軸の移動速度 : number
    -y軸の移動速度 : number
    +コンストラクター(コンテキスト,x座標,y座標,半径,x軸の移動速度,y軸の移動速度) void
    +プロパティを取得する() object
    +x軸の移動速度を反転する() void
    +y軸の移動速度を反転する() void
    +更新する() void
    +描画する() void
  }
  class パドル {
    -コンテキスト
    -x座標 : number
    -y座標 : number
    -幅 : number
    -高さ : number
    -x軸の移動速度 : number
    -移動速度 : number
    +コンストラクター(コンテキスト,x座標,y座標,幅,高さ,移動速度) void
    +プロパティを取得する() object
    +x軸の移動速度を設定する(x軸の移動速度) void
    +更新する()
    +描画する()
  }
  class ブロック {
    -コンテキスト
    -x座標 : number
    -y座標 : number
    -幅 : number
    -高さ : number
    -表示フラグ : boolean
    -獲得ポイント : number$
    +コンストラクター(コンテキスト,x座標,y座標,幅,高さ) void
    +プロパティを取得する() object
    +表示フラグを取得する() boolean
    +表示する() void
    +非表示にする() void
    +描画する()
  }
  class スコア {
    -得点 : number
    +得点を取得する() number
    +得点を設定する(得点) number
  }
  class ゲームバー {
    -コンテキスト
    -スコア : Score
    +コンストラクター(コンテキスト) void
    +得点を追加する(得点) void
    +描画する() void
  }

  ゲームビュー "1" -- "1" ボール
  ゲームビュー "1" -- "1..*" ブロック
  ゲームビュー "1" -- "1" パドル
  ゲームビュー "1" -- "1" ゲームバー
  ゲームバー "1" -- "1" スコア
```

</details>

## v2

### 技術スタック

- JavaScript の基本構文（変数、配列、分岐処理、繰り返し処理、関数、クラス）
- DOM とイベント（keydown イベント、keyup イベント）
- canvas と audio

### 画面

![アプリ画像](images/v2.png)
