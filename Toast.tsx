import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      onDismiss(toasts[0].id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-soft-xl border transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#174B35] text-white border-[#26734D]'
              : 'bg-white text-gray-800 border-gray-200'
          }`}
        >
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#F4C542]" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#26734D]" />
            )}
          </div>
          <div className="flex-1 mr-2">
            <h4 className="text-sm font-semibold">{toast.title}</h4>
            <p className="text-xs mt-0.5 opacity-90">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
