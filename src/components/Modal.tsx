// Modal.tsx
import React from "react";
import { X } from "lucide-react";

// ModalコンポーネントのPropsの型定義
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Modalコンポーネント
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  // モーダルの表示
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl mx-auto my-6 px-4">
        <div className="relative flex flex-col w-full bg-light-input dark:bg-dark-header border border-light-card dark:border-dark-card rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-light-card dark:border-dark-card rounded-t">
            <h3 className="text-2xl font-semibold text-light-text dark:text-dark-text">
              設定
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-light-text dark:text-dark-text float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
          <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
