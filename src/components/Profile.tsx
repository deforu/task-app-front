import React, { useState, useEffect } from "react";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const { name, image } = JSON.parse(savedProfile);
      setName(name);
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
    const profile = { name, image };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    // Here you would typically update the app's global state or context
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">プロフィール</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          プロフィールを保存
        </button>
      </div>
    </div>
  );
};

export default Profile;
