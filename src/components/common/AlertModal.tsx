// components/common/AlertModal.tsx
export default function AlertModal({
  open,
  onClose,
  message,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 min-w-[260px] flex flex-col items-center">
        <div className="mb-6 text-base text-center">{message}</div>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-8 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}
