// client.ts

import axios from "axios";
import Cookies from "js-cookie";
import applyCaseMiddleware from "axios-case-converter";

// ヘッダーの変換を無視するオプション
const options = {
  ignoreHeaders: true,
};

// process.env.REACT_APP_API_URL は環境変数からAPIのURLを取得。なければ右のデフォルト値を使用。
const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api/v1",
  }),
  options
);
//----------------------------------

// 以下は認証用のインターセプター　リクエストとレスポンスの間に割り込む
client.interceptors.request.use((config) => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (accessToken && clientToken && uid) {
    config.headers["access-token"] = accessToken;
    config.headers["client"] = clientToken;
    config.headers["uid"] = uid;
    config.headers["token-type"] = "Bearer";
  }

  return config;
});

// **レスポンスインターセプターを追加**
client.interceptors.response.use(
  (response) => {
    // 新しいトークンがレスポンスヘッダーに含まれている場合、クッキーを更新
    const newAccessToken = response.headers["access-token"];
    const newClientToken = response.headers["client"];
    const newUid = response.headers["uid"];

    if (newAccessToken && newClientToken && newUid) {
      Cookies.set("_access_token", newAccessToken);
      Cookies.set("_client", newClientToken);
      Cookies.set("_uid", newUid);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
