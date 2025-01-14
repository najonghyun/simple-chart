class RandomDates {
  constructor() {
    this.items = []
  }
  // formatDate(date): Date 객체를 "YYYY-MM-DD HH:mm:ss" 형식으로 변환
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:00:00`
  }
  // getRandomDate(startDate, endDate): startDate와 endDate 사이의 랜덤 날짜 생성
  getRandomDate(startDate, endDate) {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const randomTime = new Date(start + Math.random() * (end - start))
    return randomTime
  }
  create(size) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 3)

    for (let i = 0; i < size; i++) {
      const randomStart = this.getRandomDate(oneWeekAgo, today)
      const minEnd = new Date(randomStart)
      minEnd.setHours(minEnd.getHours() + 1)
      const maxEnd = new Date(randomStart)
      maxEnd.setHours(maxEnd.getHours() + 24)
      const randomEnd = this.getRandomDate(minEnd, Math.min(maxEnd, today))
      this.items.push({
        id: i + 1,
        start: this.formatDate(randomStart),
        end: this.formatDate(randomEnd),
      })
    }
    console.log(this.items)
  }
  clear() {
    this.items = []
  }
}

export default RandomDates
