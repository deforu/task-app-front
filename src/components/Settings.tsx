import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useTheme } from "../contexts/ThemeContext";
import { signOut } from "../lib/api/auth";
import Cookies from "js-cookie";
import client from "../lib/api/client";

const Settings: React.FC = () => {
  // AuthContext から currentUser, setCurrentUser, fetchCurrentUser, setIsSignedIn を取得
  const { currentUser, setCurrentUser, fetchCurrentUser, setIsSignedIn } =
    useContext(AuthContext);

  const { theme, fontSize, setTheme, setFontSize } = useTheme();
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // (1) マウント時 or currentUser の変化時にローカルの name, preview を更新
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setPreview(currentUser.avatarUrl || "/default-avatar.png");
    }
  }, [currentUser]);

  // ファイル選択時に実行
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 変更の保存
  const saveChanges = async () => {
    try {
      if (file && currentUser) {
        const formData = new FormData();
        formData.append("user[avatar]", file);

        const putRes = await client.put(
          `/users/${currentUser.id}/avatar`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("PUT /users/:id/avatar のレスポンス", putRes.data);
      }

      // 再取得
      const response = await client.get("/users/me");
      console.log("GET /users/me のレスポンス", response.data); // ← ココ重要
      setCurrentUser(response.data);
      setPreview(null);
      setIsSaved(true);
    } catch (error) {
      console.error("変更の保存に失敗しました:", error);
    }
  };

  // サインアウト
  const handleSignOut = async () => {
    try {
      const res = await signOut();
      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setIsSignedIn(false);
        navigate("/signin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 card shadow-md rounded-lg text-light-text dark:text-dark-text">
      <h2 className="text-2xl font-bold mb-4">プロフィールと設定</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">プロフィール画像:</label>
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-black"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block mb-2">名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 text-light-text"
          />
        </div>

        <div>
          <label className="block mb-2">テーマ:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            className="w-full p-2 border rounded text-light-text"
          >
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">フォントサイズ:</label>
          <select
            value={fontSize}
            onChange={(e) =>
              setFontSize(e.target.value as "small" | "medium" | "large")
            }
            className="w-full p-2 border rounded text-light-text"
          >
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="mr-2"
            />
            通知を受け取る
          </label>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={saveChanges}
          className={`w-full px-4 py-2 rounded transition-all duration-300 ${
            isSaved
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isSaved ? "保存しました！" : "変更を保存"}
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Settings;
