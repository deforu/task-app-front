// Settings.tsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { useTheme } from "../contexts/ThemeContext";

const Profile: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme, fontSize, setTheme, setFontSize } = useTheme();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const { name, image } = JSON.parse(savedProfile);
      setName(name || currentUser?.name || "");
      setImage(image);
    } else {
      setName(currentUser?.name || "");
    }

    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, [currentUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    const profile = { name, image };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem("notifications", JSON.stringify(notifications));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-4 card shadow-md rounded-lg text-light-text dark:text-dark-text">
      <h2 className="text-2xl font-bold mb-4">プロフィールと設定</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">プロフィール画像:</label>
          {image && (
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block mb-2">名前:</label>
          <input
            type="text"
            value={currentUser?.name || ""}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 text-light-text"
          />
        </div>
        <div>
          <label className="block mb-2">メールアドレス:</label>
          <input
            type="email"
            value={currentUser?.email || ""}
            readOnly
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
    </div>
  );
};

export default Profile;
