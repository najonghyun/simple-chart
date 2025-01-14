<template>
  <div class="range-container">
    <div class="range-background-box">
      <div class="range-background-quadrant-top">
        <div class="range-background-quadrant-02"></div>
        <div class="range-background-quadrant-01"></div>
      </div>
      <div class="range-background-quadrant-bottom">
        <div class="range-background-quadrant-03"></div>
        <div class="range-background-quadrant-04"></div>
      </div>
      <div class="range-background-grid">
        <div class="range-background-grid-line" v-for="n in 25" :key="n"></div>
      </div>
      <div class="range-background-grid-text">
        <div v-for="n in 25" :key="n">{{ n - 1 }}</div>
      </div>
    </div>
    <div class="range-items-box">
      <div class="range-items-grid">
        <div
          class="range-items-grid-content"
          v-for="range in filteredDates"
          :key="range.id"
          :style="computeStyle(range.start, range.end)"
        >
          <div
            v-if="!range.moreStart"
            class="range-items-grid-circle grid-circle-left"
          >
            {{ range.id }}
          </div>
          <div
            class="range-items-grid-line"
            :style="{
              marginLeft: range.moreStart ? '0px' : '7.5px',
              marginRight: range.moreEnd ? '0px' : '7.5px',
            }"
          ></div>
          <div
            v-if="!range.moreEnd"
            class="range-items-grid-circle grid-circle-right"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // dates: new RandomDates(),
    };
  },
  // created() {
  //   this.dates.create(5);
  // },
  computed: {
    ...mapState({ number: "number", date: "date", dates: "dates" }),
    filteredDates() {
      const targetDate = new Date(this.date);
      const targetStart = new Date(targetDate);
      targetStart.setHours(0, 0, 0, 0);

      const targetEnd = new Date(targetDate);
      targetEnd.setHours(23, 59, 59, 999);

      return this.dates.items
        .map((range) => {
          const startDate = new Date(range.start);
          const endDate = new Date(range.end);

          // 선택된 날짜와 겹치는 범위를 확인
          if (endDate < targetStart || startDate > targetEnd) {
            return null;
          }
          const start = startDate < targetStart ? 0 : startDate.getHours();
          const end = endDate > targetEnd ? 24 : endDate.getHours();

          return {
            id: range.id,
            start: start,
            end: end,
            moreStart: startDate < targetStart,
            moreEnd: endDate > targetEnd,
          };
        })
        .filter((range) => range !== null); // null 값 제거
    },
  },
  methods: {
    computeStyle(start, end) {
      const totalHours = 24; // 하루 24시간 기준
      const startPercentage = (start / totalHours) * 100;
      const endPercentage = (end / totalHours) * 100;
      return {
        left: `${startPercentage}%`, // 시작 위치
        width: `${endPercentage - startPercentage}%`, // 길이
        // backgroundColor: "rgba(0, 0, 255, 0.3)", // 그래프 색상
      };
    },
  },
};
</script>
<style>
.range-container {
  position: relative;
  height: 400px;
  margin-top: 25px;
}
.range-background-box {
  position: relative;
  height: 400px;
  /* background-color: aqua; */
}
.range-background-quadrant-top {
  height: 350px;
  display: flex;
}
.range-background-quadrant-02 {
  height: 350px;
  flex: 1;
  /* background-color: gray; */
}
.range-background-quadrant-01 {
  height: 350px;
  flex: 9;
  border-left: 1px solid black;
  /* background-color: darkred; */
}
.range-background-quadrant-bottom {
  height: 50px;
  display: flex;
}
.range-background-quadrant-03 {
  height: 50px;
  flex: 1;
  border-top: 1px solid black;
  background-color: antiquewhite;
}
.range-background-quadrant-04 {
  height: 50px;
  flex: 9;
  border-left: 1px solid black;
  border-top: 1px solid black;
  background-color: coral;
}
.range-background-grid {
  position: absolute;
  top: calc(350px - 6px);
  left: 10%;
  height: 12px;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 1fr;
  /* z-index: 2; */
}
.range-background-grid-line {
  border-right: 1px solid black; /* 세로선 */
  height: 100%;
}
.range-background-grid-text {
  position: absolute;
  top: calc(350px + 10px);
  left: 8%;
  height: 20px;
  width: 93.75%;
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  grid-template-rows: 1fr;
  text-align: center;
  font-size: 0.75rem;
}
.range-items-box {
  position: absolute;
  background-color: rgba(0, 0, 255, 0.3);
  top: 0;
  left: 10%;
  height: 350px;
  width: 90%;
  z-index: 2;
}
.range-items-grid {
  display: flex;
  flex-direction: column;
  height: 350px;
  /* justify-content: space-between; */
}
.range-items-grid-content {
  position: relative;
  flex: 1;
  align-content: center;
}
.range-items-grid-circle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 2px solid black;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 700;
}
.grid-circle-left {
  left: -7.5px;
}
.grid-circle-right {
  right: -7.5px;
}
.range-items-grid-line {
  height: 2px;
  background-color: black;
}
</style>