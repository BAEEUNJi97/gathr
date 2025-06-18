export function formatDate(dateTime: string): string {
  const date = new Date(dateTime);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatTime(dateTime: string): string {
  const date = new Date(dateTime);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function getTimeRemaining(registrationEnd: string): string {
  const endTime = new Date(registrationEnd).getTime();
  const now = new Date().getTime();
  const diff = endTime - now;

  if (diff <= 0) return '마감됨';


  const endDate = new Date(registrationEnd);
  const isToday = new Date().toDateString() === endDate.toDateString();

  const hour = endDate.getHours();
  const minute = endDate.getMinutes();
  const timeText = `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;

  return isToday ? `오늘 ${timeText} 마감` : `${formatDate(registrationEnd)} ${timeText} 마감`;
}
