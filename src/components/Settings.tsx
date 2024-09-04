import React, { useState, useEffect } from "react";

const Settings: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [notifications, setNotifications] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      const { theme, fontSize, notifications } = JSON.parse(savedSettings);
      setTheme(theme);
      setFontSize(fontSize);
      setNotifications(notifications);
    }
  }, []);

  const saveSettings = () => {
    const settings = { theme, fontSize, notifications };
    localStorage.setItem("userSettings", JSON.stringify(settings));

    document.body.className = theme;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">設定</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">テーマ:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">フォントサイズ:</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full p-2 border rounded"
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
        <button
          onClick={saveSettings}
          className={`bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300 ${
            isSaved ? "bg-green-500" : ""
          }`}
        >
          {isSaved ? "保存しました！" : "設定を保存"}
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

export default Settings;
