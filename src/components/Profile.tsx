// Profile.tsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";

const Profile: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const { image } = JSON.parse(savedProfile);
      setImage(image);
    }
  }, []);

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

  const saveProfile = () => {
    const profile = { image };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">プロフィール</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">名前:</label>
          <span>こんにちは、{currentUser?.name}さん</span>
          <input
            type="text"
            value={currentUser?.name || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-2">メールアドレス:</label>
          <input
            type="email"
            value={currentUser?.email || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-2">プロフィール画像:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {image && (
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
        <button
          onClick={saveProfile}
          className={`bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300 ${
            isSaved ? "bg-green-500" : ""
          }`}
        >
          {isSaved ? "保存しました！" : "プロフィール画像を保存"}
        </button>
        {isSaved && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Profile;
