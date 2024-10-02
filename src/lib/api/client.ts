import axios from "axios"
import Cookies from "js-cookie";
import applyCaseMiddleware from "axios-case-converter"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true 
}

const client = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api/v1"
}), options)

client.interceptors.request.use((config) => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (accessToken && clientToken && uid) {
    config.headers["access-token"] = accessToken;
    config.headers["client"] = clientToken;
    config.headers["uid"] = uid;
  }

  return config;
});
export default client
