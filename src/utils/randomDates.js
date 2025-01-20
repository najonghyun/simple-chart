import { formatDate } from './filters'

// getRandomDate(startDate, endDate): startDate와 endDate 사이의 랜덤 날짜 생성
function getRandomDate(startDate, endDate) {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const randomTime = new Date(start + Math.random() * (end - start))
  return randomTime
}

// RandomDates : 현재 날짜 기준 최근 3개월의 랜덤 범위 날짜를 관리하는 클래스
class RandomDates {
  constructor() {
    this.items = []
  }
  create(size) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const ago = new Date(today)
    ago.setDate(today.getDate() - 3)

    for (let i = 0; i < size; i++) {
      const randomStart = getRandomDate(ago, today)
      const minEnd = new Date(randomStart)
      minEnd.setHours(minEnd.getHours() + 1)
      const maxEnd = new Date(randomStart)
      maxEnd.setHours(maxEnd.getHours() + 24)
      const randomEnd = getRandomDate(Math.min(minEnd, today), Math.min(maxEnd, today))
      this.items.push({
        id: i + 1,
        start: formatDate(randomStart),
        end: formatDate(randomEnd),
      })
    }
    console.log(this.items)
  }
  clear() {
    this.items = []
  }
}

export default RandomDates
