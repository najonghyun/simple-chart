import Vue from 'vue'
import Vuex from 'vuex'
import RandomDates from '@/utils/randomDates'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    number: 0,
    date: '',
    dates: new RandomDates(),
    filteredDates: [],
  },
  mutations: {
    SET_NUMBER(state, newNumber) {
      state.number = Number(newNumber)
    },
    SET_DATE(state, newDate) {
      state.date = newDate
    },
    SET_DATES(state, newNumber) {
      state.dates.clear()
      state.dates.create(newNumber)
    },
    SET_FILTEREDDATES(state, newDate) {
      const targetDate = new Date(newDate)
      const targetStart = new Date(targetDate)
      targetStart.setHours(0, 0, 0, 0)

      const targetEnd = new Date(targetDate)
      targetEnd.setHours(23, 59, 59, 999)

      state.filteredDates = state.dates.items
        .map((range) => {
          const startDate = new Date(range.start)
          const endDate = new Date(range.end)

          // 선택된 날짜와 겹치는 범위를 확인
          if (endDate < targetStart || startDate > targetEnd) {
            return null
          }
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
        .filter((range) => range !== null) // null 값 제거
    },
  },
  actions: {
    ADD_DATES({ state, commit }, number) {
      commit('SET_NUMBER', number)
      commit('SET_DATES', number)
      commit('SET_FILTEREDDATES', state.date)
    },
    UPDATE_DATE({ commit }, date) {
      commit('SET_DATE', date)
      commit('SET_FILTEREDDATES', date)
    },
  },
})

export default store
