// formatDate(date): Date 객체를 "YYYY-MM-DD HH:mm:ss" 형식으로 변환
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// formatTime(date): Date 객체를 "HH시 mm분 ss초" 형식으로 변환
export function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${hours}시 ${minutes}분 ${seconds}`
}

// convertToHours(date): Date 객체의 time을 hour의 범위 기준으로 값 반환 (ex. 1시 30분 -> 1.5)
export function convertToHours(date) {
  const temp = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
  return temp
}

// convertToSeconds(date): Date 객체의 time을 seconds(초) 값으로 환산 (ex. 30분 30초 -> 1830초)
export function convertToSeconds(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return hours * 3600 + minutes * 60 + seconds
}
