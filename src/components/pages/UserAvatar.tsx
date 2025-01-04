import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserAvatar = () => {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ユーザー情報を取得
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/users/me",
        {
          headers: {
            "access-token": Cookies.get("_access_token") || "",
            client: Cookies.get("_client") || "",
            uid: Cookies.get("_uid") || "",
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました:", error);
    }
  };

  // ファイル選択時に実行
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ファイルをアップロード
  const handleUpload = async () => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    if (!user) {
      alert("ユーザー情報が取得できていません");
      return;
    }

    const formData = new FormData();
    formData.append("user[avatar]", file);

    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/users/${user.id}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "access-token": Cookies.get("_access_token") || "",
            client: Cookies.get("_client") || "",
            uid: Cookies.get("_uid") || "",
          },
        }
      );
      alert("アップロードに成功しました！");
      setPreview(null);
      fetchUser(); // 更新後に再取得
    } catch (error) {
      console.error("アップロードに失敗しました:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      <div>
        <h2>ユーザー情報</h2>
        {user ? (
          <p>
            ユーザー名: {user.name} <br />
            メール: {user.email}
          </p>
        ) : (
          <p>ユーザー情報を読み込み中...</p>
        )}
      </div>

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
          アップロード
        </button>
      </div>

      <div>
        <h3>アイコンプレビュー</h3>
        <img
          src={preview || user?.avatar_url || "/default-avatar.png"}
          alt="User Avatar"
          width={150}
          height={150}
          style={{ border: "2px solid black", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default UserAvatar;
