export function formatDate(dateTime: string): string {
  const date = new Date(dateTime);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatTime(dateTime: string): string {
  const date = new Date(dateTime);
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
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

export function getTimeRemainingDaysOnly(registrationEnd: string): string {
  const endTime = new Date(registrationEnd).setHours(0,0,0,0);
  const now = new Date();
  now.setHours(0,0,0,0); // 오늘 기준

  const diff = endTime - now.getTime();

  if (diff <= 0) return '마감됨';

  const dayDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${dayDiff}일 후 마감`;
}