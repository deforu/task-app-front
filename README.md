
<div id="top"></div>

# Task App Frontend

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

Task App Frontendは、React + TypeScript を使用したタスク管理アプリのフロントエンドです。  
ユーザーはタスクをフォルダごとに整理・管理できます。  
本プロジェクトは、バックエンドの Rails API と連携して動作します。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## デプロイ環境

| サービス | URL |
|----------|----------------------------------------------|
| フロントエンド（Vercel） | [task-app-front](https://task-app-front-sepia.vercel.app/) |
| バックエンドAPI（Render） | [task-app-back API](https://task-app-back-ws1o.onrender.com/api/v1/todos) |

⚠ 注意: フロントエンド単体では動作しません。バックエンドAPIを利用する必要があります。

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## 環境

| 技術                | バージョン |
|---------------------|----------|
| React              | 18.x     |
| TypeScript         | 4.x      |
| Tailwind CSS       | 3.x      |
| React Router       | 6.x      |
| Axios              | 0.x      |
| Vite               | 4.x      |

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## ディレクトリ構成

```
task-app-front/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── components/        # UIコンポーネント
│   │   ├── layouts/      # 共通レイアウト
│   │   ├── pages/        # 各ページ
│   │   ├── utils/        # ユーティリティ関数
│   ├── contexts/         # 状態管理用のContext
│   ├── lib/api/          # API通信関連
│   ├── App.tsx
│   ├── index.tsx
├── package.json
├── tsconfig.json
└── yarn.lock
```

<p align="right">(<a href="#top">トップへ</a>)</p>

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

<p align="right">(<a href="#top">トップへ</a>)</p>

---

## API連携

本プロジェクトは Rails API と通信して動作します。  
以下は、主なAPIエンドポイントです。

### 認証関連

| メソッド | エンドポイント | 説明 |
|----------|---------------------------|----------------|
| `POST`   | `/auth/sign_in`            | ログイン |
| `POST`   | `/auth/sign_up`            | ユーザー登録 |
| `DELETE` | `/auth/sign_out`           | ログアウト |
| `GET`    | `/auth/sessions`           | ログイン状態確認 |

### タスク管理

| メソッド | エンドポイント | 説明 |
|----------|----------------------|----------------------------|
| `GET`    | `/todos`             | タスク一覧取得 |
| `POST`   | `/todos`             | タスク作成 |
| `PATCH`  | `/todos/:id`         | タスク更新 |
| `DELETE` | `/todos/:id`         | タスク削除 |

### フォルダ管理

| メソッド | エンドポイント | 説明 |
|----------|-----------------------|----------------|
| `GET`    | `/folders`            | フォルダ一覧取得 |
| `POST`   | `/folders`            | フォルダ作成 |
| `PATCH`  | `/folders/:id`        | フォルダ更新 |
| `DELETE` | `/folders/:id`        | フォルダ削除 |

<p align="right">(<a href="#top">トップへ</a>)</p>
