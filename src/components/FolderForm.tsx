// src/components/FolderForm.tsx
import React, { useState, useEffect } from "react";

interface FolderFormProps {
  // 初期値 (編集時に表示)
  defaultName?: string;
  defaultSharedUser?: string;

  // 作成 or 編集 判定
  isEditing?: boolean;

  // フォーム送信時に呼ばれるコールバック (名前と共有先を返す)
  onSubmit: (name: string, sharedUser: string) => void;

  // フォルダ削除ボタン押下時のコールバック
  onDelete?: () => void;
}

const FolderForm: React.FC<FolderFormProps> = ({
  defaultName = "",
  defaultSharedUser = "",
  isEditing = false,
  onSubmit,
  onDelete,
}) => {
  const [folderName, setFolderName] = useState(defaultName);
  const [sharedUser, setSharedUser] = useState(defaultSharedUser);

  // Edit用: propsが変わったときフォームを同期
  useEffect(() => {
    setFolderName(defaultName);
    setSharedUser(defaultSharedUser);
  }, [defaultName, defaultSharedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    onSubmit(folderName, sharedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">フォルダ名</label>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
          placeholder="フォルダ名"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          共有するユーザー
        </label>
        <input
          type="text"
          value={sharedUser}
          onChange={(e) => setSharedUser(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
          placeholder="ユーザー名やメールなど"
        />
      </div>

      <div className="flex justify-end space-x-2">
        {/* 保存ボタン */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          保存
        </button>

        {/* 削除ボタン: 編集モードのみ表示 */}
        {isEditing && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};

export default FolderForm;
