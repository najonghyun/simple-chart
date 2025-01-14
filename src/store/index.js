import Vue from 'vue'
import Vuex from 'vuex'
import RandomDates from '@/utils/randomDates'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    number: 0,
    date: '',
    dates: new RandomDates(),
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
  },
})

export default store
