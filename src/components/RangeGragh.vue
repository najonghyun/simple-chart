<template>
  <div class="range-container">
    <div class="range-background-box">
      <div class="range-background-quadrant-top">
        <div class="range-background-quadrant-02">
          <div class="range-background-quadrant-02-text">표본</div>
        </div>
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
          :style="computeStyle(format(range.start), format(range.end))"
        >
          <div v-if="hoveredId === range.id" class="range-items-grid-bubble">
            <span v-if="!range.moreStart">{{ formatTime(range.start) }}</span> ~
            {{ formatTime(range.end) }}
          </div>
          <div
            class="range-items-grid-box"
            @mouseover="onMouseOver(range.id)"
            @mouseleave="onMouseLeave"
          >
            <div
              v-if="!range.moreStart"
              class="range-items-grid-circle grid-circle-left"
              :style="{
                backgroundColor: hoveredId === range.id ? '#5F6C7A' : 'black',
              }"
            >
              <!-- {{ range.id }} -->
            </div>
            <div
              class="range-items-grid-line"
              :style="{
                marginLeft: range.moreStart ? '0px' : '5px',
                marginRight: range.moreEnd ? '0px' : '5px',
                backgroundColor: hoveredId === range.id ? '#5F6C7A' : 'black',
              }"
            ></div>
            <div
              v-if="!range.moreEnd"
              class="range-items-grid-circle grid-circle-right"
              :style="{
                backgroundColor: hoveredId === range.id ? '#5F6C7A' : 'black',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      hoveredId: null,
    };
  },
  // created() {
  //   this.dates.create(5);
  // },
  computed: {
    ...mapState({ filteredDates: "filteredDates" }),
    // ...mapState({ number: "number", date: "date", dates: "dates" }),
    // filteredDates() {
    //   const targetDate = new Date(this.date);
    //   const targetStart = new Date(targetDate);
    //   targetStart.setHours(0, 0, 0, 0);

    //   const targetEnd = new Date(targetDate);
    //   targetEnd.setHours(23, 59, 59, 999);

    //   return this.dates.items
    //     .map((range) => {
    //       const startDate = new Date(range.start);
    //       const endDate = new Date(range.end);

    //       // 선택된 날짜와 겹치는 범위를 확인
    //       if (endDate < targetStart || startDate > targetEnd) {
    //         return null;
    //       }
    //       const start =
    //         startDate < targetStart
    //           ? 0
    //           : startDate.getHours() + startDate.getMinutes() / 60;
    //       const end =
    //         endDate > targetEnd
    //           ? 24
    //           : endDate.getHours() + endDate.getMinutes() / 60;

    //       return {
    //         id: range.id,
    //         start: start,
    //         end: end,
    //         moreStart: startDate < targetStart,
    //         moreEnd: endDate > targetEnd,
    //       };
    //     })
    //     .filter((range) => range !== null); // null 값 제거
    // },
  },
  methods: {
    ...mapMutations(["SET_FILTEREDDATES"]),
    format(date) {
      const temp =
        date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
      return temp;
    },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${hours}시 ${minutes}분 ${seconds}`;
    },
    onMouseOver(id) {
      this.hoveredId = id;
    },
    onMouseLeave() {
      this.hoveredId = null;
    },
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
  background-color: #778899;
}
.range-background-quadrant-02-text {
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
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
  /* background-color: antiquewhite; */
}
.range-background-quadrant-04 {
  height: 50px;
  flex: 9;
  border-left: 1px solid black;
  border-top: 1px solid black;
  /* background-color: coral; */
}
.range-background-grid {
  position: absolute;
  top: calc(350px - 4px);
  left: 10%;
  height: 8px;
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
  /* background-color: rgba(0, 0, 255, 0.3); */
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
.range-items-grid-bubble {
  position: absolute;
  top: calc(50% + 10px);
  left: 5px;
  height: 30px;
  width: max-content;
  align-content: center;
  background-color: #fdf0df;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 10px;
  z-index: 2;
  font-size: 0.75rem;
}
.range-items-grid-box {
  height: max-content;
  padding: 10px 0;
  /* align-content: center; */
}
.range-items-grid-circle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 700;
  /* background-color: black; */
}
.grid-circle-left {
  left: -5px;
}
.grid-circle-right {
  right: -5px;
}
.range-items-grid-line {
  height: 1px;
  /* background-color: black; */
}
</style>