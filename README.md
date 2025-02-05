
<div id="top"></div>

# Task App Front

## 使用技術一覧

<p style="display: inline">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-TypeScript-3178C6.svg?logo=typescript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Create%20React%20App-09D3AC.svg?logo=react&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React%20Router-CA4245.svg?logo=reactrouter&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Material%20UI-007FFF.svg?logo=mui&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Axios-5A29E4.svg?logo=axios&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Jest-C21325.svg?logo=jest&style=for-the-badge">
</p>


## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [デプロイ環境](#デプロイ環境)
3. [環境](#環境)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [開発環境構築](#開発環境構築)
6. [API連携](#api連携)

---

## プロジェクトについて

Task App Frontは、React + TypeScript を使用したタスク管理アプリのフロントエンドです。  
ユーザーはタスクをフォルダごとに整理・管理できます。  
本プロジェクトは、バックエンドの Rails API と連携して動作します。

---

## デプロイ環境

| サービス | URL |
|----------|----------------------------------------------|
| フロントエンド（Vercel） | [task-app-front](https://task-app-front-sepia.vercel.app/) |
| バックエンドAPI（Render） | [task-app-back API](https://task-app-back-ws1o.onrender.com/api/v1/todos) |

⚠ 注意: フロントエンド単体では動作しません。バックエンドAPIを利用する必要があります。

バックエンドのリポジトリ：  [task-app-back](https://github.com/deforu/task-app-back) 

## 使い方（デモ環境）

本プロジェクトは、Vercel にデプロイされたフロントエンドと、Render にデプロイされたバックエンドを利用しています。  
初回アクセス時には、以下の点に注意してください。

### **1. ユーザー登録が必要**
- 初めて利用する場合は、**サインアップ（ユーザー登録）** を行ってください。
- **⚠ 注意：登録時には普段使用しているメールアドレスを入力しないでください。**
  - デモ環境ではメールの送受信機能は使用しないため、  
    `test@example.com` のような**テスト用のメールアドレス**を使用してください。
  - **例:**  
    ✅ `test@example.com`  
    ✅ `user123@demo.com`  
    ❌ `yourpersonal@gmail.com`（個人アドレスは使用しない）

### **2. データベースが動き出すまで時間がかかる**
- Render の無料プランを使用しているため、バックエンドのデータベースが **スリープ状態** の場合があります。
- ユーザー登録後、数十秒待つとバックエンドが起動し、データが正しく保存されるようになります。

### **3. しばらく待てばTodoリストが正常に動作**
- ユーザー登録後、**Todoリストの追加・編集・削除** が可能になります。
- 初回起動時に動作が遅い場合は **リロード** してみてください。

#### **💡 問題が発生した場合**
- 「タスクが追加されない」「ログインしても動作しない」場合は、数十秒待ってから再試行してください。
- それでも動作しない場合は、ブラウザのキャッシュをクリアして再読み込みしてください。


---

## 環境

| 技術                | バージョン |
|---------------------|----------|
| React              | 18.3.1   |
| TypeScript         | 4.4.2    |
| Create React App   | 5.0.1    |
| React Router       | 6.26.2   |
| Axios              | 1.7.7    |
| Material-UI        | 4.12.4   |
| Tailwind CSS       | 3.4.9    |


---

## ディレクトリ構成

```
task-app-front/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── CommonLayout.tsx        // アプリ全体で共通のレイアウトを提供
│   │   │   └── Header.tsx              // ユーザー認証状態に応じたナビゲーションボタン
│   │   ├── pages/
│   │   │   ├── Home.tsx                 // サインイン後に表示されるホームページ
│   │   │   ├── SignIn.tsx               // 既存アカウントへのサインインページ
│   │   │   └── SignUp.tsx               // 新規アカウント作成のサインアップページ
│   │   └── utils/
│   │       └── AlertMessage.tsx         // アラートメッセージ表示ユーティリティ
│   ├── Header.js                         // ヘッダー構成。タイトル、メニュートグル、ナビゲーションメニュー
│   ├── Modal.tsx                         // モーダルウィンドウ表示コンポーネント
│   ├── Notifications.tsx                 // お知らせセクション表示コンポーネント
│   ├── Profile.tsx                       // ユーザー名とプロフィール画像の管理・保存
│   ├── Settings.tsx                      // 個人設定管理コンポーネント（テーマ、フォントサイズ、通知設定など）
│   ├── Sidebar.js                        // サイドバーコンポーネント（タスクのフィルタリング、検索機能）
│   ├── TodoForm.tsx                      // 新規タスク作成フォーム
│   ├── TodoItem.tsx                      // 各Todoアイテムの表示・編集・削除機能
│   ├── TodoList.tsx                      // タスクリスト表示・フィルタリング・検索・編集機能
│   ├── contexts/
│   │   └── ThemeContext.tsx              // テーマとフォントサイズの管理
│   ├── interfaces/
│   │   └── index.ts                      // TypeScriptインターフェース定義
│   ├── lib/
│   │   └── api/
│   │       ├── auth.ts                    // 認証関連API通信
│   │       ├── client.ts                  // Axiosインスタンス設定
│   │       └── todos.ts                   // Todo関連API通信
│   ├── App.tsx                            // メインアプリケーションコンポーネント
│   ├── index.css                          // グローバルスタイル
│   ├── index.tsx                          // Reactアプリケーションのエントリーポイント
│   └── react-app-env.d.ts                 // TypeScript環境定義
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

---

## 開発環境構築

### 1️⃣ フロントエンドのセットアップ

1. **リポジトリをクローン**
   ```sh
   git clone https://github.com/deforu/task-app-front.git
   cd task-app-front
   ```
2. **依存関係をインストール**
   ```sh
   yarn install
   ```
3. **環境変数を設定**  
   `.env` ファイルを作成し、以下の内容を記述:
   ```sh
   REACT_APP_API_URL=<バックエンドのURLを入力>
   ```
4. **開発サーバーを起動**
   ```sh
   yarn dev
   ```

---

## API連携

本プロジェクトは Rails API と通信して動作します。  
以下は、主なAPIエンドポイントです。

### 認証関連

| メソッド | エンドポイント | 説明 |
|----------|---------------------------|----------------|
| `POST`   | `/api/v1/auth/sign_in`            | ログイン |
| `POST`   | `/api/v1/auth/sign_up`            | ユーザー登録 |
| `DELETE` | `/api/v1/auth/sign_out`           | ログアウト |
| `GET`    | `/api/v1/auth/sessions`           | ログイン状態確認 |

### タスク管理

| メソッド | エンドポイント | 説明 |
|----------|----------------------|----------------------------|
| `GET`    | `/api/v1/todos`             | タスク一覧取得 |
| `POST`   | `/api/v1/todos`             | タスク作成 |
| `PATCH`  | `/api/v1/todos/:id`         | タスク更新 |
| `DELETE` | `/api/v1/todos/:id`         | タスク削除 |
| `GET` | `/api/v1/todos/important` | 重要なタスクの取得 |
| `GET` | `/api/v1/todos/today` | 今日のタスクの取得 |
| `GET` | `/api/v1/todos/completed` | 完了済みタスクの取得 |

### フォルダ管理

| メソッド | エンドポイント | 説明 |
|----------|-----------------------|----------------|
| `GET`    | `/api/v1/folders`            | フォルダ一覧取得 |
| `POST`   | `/api/v1/folders`            | フォルダ作成 |
| `PATCH`  | `/api/v1/folders/:id`        | フォルダ更新 |
| `DELETE` | `/api/v1/folders/:id`        | フォルダ削除 |
| `GET` | `/api/v1/folders/:folder_id/todos` | 特定フォルダのタスク一覧 |
| `POST` | `/api/v1/folders/:folder_id/todos` | 特定フォルダにタスク作成 |

<p align="right">(<a href="#top">トップへ</a>)</p>
