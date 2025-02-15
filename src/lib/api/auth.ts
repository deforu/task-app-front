import client from "./client";
import Cookies from "js-cookie";

import { SignUpParams, SignInParams } from "../../interfaces/index";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post("auth/sign_in", params);
};

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = async () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return null;

  try {
    const response = await client.get("/auth/sessions", {
      headers: {
        "access-token": Cookies.get("_access_token")!,
        client: Cookies.get("_client")!,
        uid: Cookies.get("_uid")!,
      },
    });
    return response.data; // ユーザー情報を返す
  } catch (error) {
    console.error("現在のユーザー情報を取得できませんでした:", error);
    return null;
  }
};
