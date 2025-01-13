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
          v-for="(range, index) in timeRanges"
          :key="index"
          :style="computeStyle(range.start, range.end)"
        >
          {{ range.start }}시 ~ {{ range.end }}시
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
      timeRanges: [
        { start: 4, end: 13 }, // 첫 번째 범위: 4시 ~ 13시
        { start: 2, end: 8 }, // 두 번째 범위: 2시 ~ 8시
        { start: 6, end: 15 }, // 세 번째 범위: 6시 ~ 15시
      ],
    };
  },
  computed: {
    ...mapState({ number: "number" }),
  },
  methods: {
    computeStyle(start, end) {
      const totalHours = 24; // 하루 24시간 기준
      const startPercentage = (start / totalHours) * 100;
      const endPercentage = (end / totalHours) * 100;
      return {
        left: `${startPercentage}%`, // 시작 위치
        width: `${endPercentage - startPercentage}%`, // 길이
        backgroundColor: "rgba(0, 0, 255, 0.3)", // 그래프 색상
      };
    },
  },
};
</script>
<style>
.range-container {
  position: relative;
  height: 400px;
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
  margin: 30px 0;
}
</style>