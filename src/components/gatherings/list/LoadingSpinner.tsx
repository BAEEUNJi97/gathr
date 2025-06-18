export default function LoadingSpinner() {
  return (
    <div className="w-full h-[80px] flex justify-center items-center">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600 font-medium">더 많은 모임을 불러오는 중...</span>
      </div>
    </div>
  );
}
