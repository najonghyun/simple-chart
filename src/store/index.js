import Vue from 'vue'
import Vuex from 'vuex'
import RandomDates from '@/utils/randomDates'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    number: 0,
    selectedDate: '',
    dates: new RandomDates(),
    filteredDates: [], // 생성된 많은 범위 중에서 하루 치만 가져 옴
    isCheckSubmit: false,
  },
  mutations: {
    SET_NUMBER(state, newNumber) {
      state.number = Number(newNumber)
    },
    SET_SELECTEDDATE(state, newselectedDate) {
      state.selectedDate = newselectedDate
    },
    SET_DATES(state, newNumber) {
      state.dates.clear()
      state.dates.create(newNumber)
    },
    SET_FILTEREDDATES(state, newDate) {
      // 1. targetDate의 시간은 0 ~ 24시로 설정
      const targetDate = new Date(newDate)
      const targetStart = new Date(targetDate)
      targetStart.setHours(0, 0, 0, 0)

      const targetEnd = new Date(targetDate)
      targetEnd.setHours(23, 59, 59, 999)

      // 2. map을 돌며 하루 범위 안에 있는 표본만 출력
      state.filteredDates = state.dates.items
        .map((range) => {
          const startDate = new Date(range.start)
          const endDate = new Date(range.end)

          // 범위가 아예 들어오지 못하면 null
          if (endDate < targetStart || startDate > targetEnd) {
            return null
          }
          // 범위가 조금은 들어온다면 짤라서 출력
          const start = startDate < targetStart ? targetStart : startDate
          const end = endDate > targetEnd ? targetEnd : endDate

          return {
            id: range.id,
            start: start,
            end: end,
            moreStart: startDate < targetStart,
            moreEnd: endDate > targetEnd,
          }
        })
        .filter((range) => range !== null) // filter로 null 값 제거
    },
    SET_ISCHECKSUBMIT(state, newIsCheckSubmit) {
      state.isCheckSubmit = newIsCheckSubmit
    },
  },
  actions: {
    ADD_DATES({ state, commit }, number) {
      commit('SET_NUMBER', number)
      commit('SET_DATES', number)
      commit('SET_FILTEREDDATES', state.selectedDate)
    },
    UPDATE_DATE({ commit }, date) {
      commit('SET_SELECTEDDATE', date)
      commit('SET_FILTEREDDATES', date)
    },
  },
})

export default store
