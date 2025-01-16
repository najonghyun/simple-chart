<template>
  <div class="range-container">
    <!-- -->
    <div class="range-background-box">
      <div class="range-background-quadrant-top" ref="box1">
        <div class="range-background-quadrant-02">
          <div class="range-background-quadrant-02-text">표본</div>
        </div>
        <div class="range-background-quadrant-01"></div>
      </div>
      <div class="range-background-quadrant-bottom">
        <div class="range-background-quadrant-03"></div>
        <div class="range-background-quadrant-04"></div>
        <div class="range-background-bottom-grid">
          <div
            class="range-background-bottom-grid-line"
            v-for="n in 25"
            :key="n"
          ></div>
        </div>
        <div class="range-background-bottom-grid-text">
          <div v-for="n in 25" :key="n">{{ n - 1 }}</div>
        </div>
      </div>
    </div>
    <!-- 요기 -->
    <div class="range-items-box" ref="box2">
      <div class="range-items-grid">
        <div
          class="range-items-grid-content"
          v-for="range in filteredDates"
          :key="range.id"
          :style="computeStyle(format(range.start), format(range.end))"
        >
          <div v-if="hoveredId === range.id" class="range-items-grid-bubble">
            <span v-if="!range.moreStart">{{ formatTime(range.start) }}</span>
            ~
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
                backgroundColor: hoveredId === range.id ? '#DC143C' : 'gray',
              }"
            >
              <!-- {{ range.id }} -->
            </div>
            <div
              class="range-items-grid-line"
              :style="{
                marginLeft: range.moreStart ? '0px' : '5px',
                marginRight: range.moreEnd ? '0px' : '5px',
                backgroundColor: hoveredId === range.id ? '#DC143C' : 'gray',
              }"
            ></div>
            <div
              v-if="!range.moreEnd"
              class="range-items-grid-circle grid-circle-right"
              :style="{
                backgroundColor: hoveredId === range.id ? '#DC143C' : 'gray',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 요기 -->
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
  computed: {
    ...mapState({ filteredDates: "filteredDates" }),
  },
  watch: {
    filteredDates() {
      this.$nextTick(() => {
        const box1 = this.$refs.box1;
        const box2 = this.$refs.box2;
        if (box1 && box2) {
          const box2Height = box2.clientHeight;
          box1.style.height = `${box2Height}px`;
        }
      });
    },
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
  min-height: 400px;
  width: 100%;
  margin-top: 25px;
}
.range-background-box {
  position: relative;
  min-height: 350px;
}
.range-background-quadrant-top {
  min-height: 350px;
  display: flex;
}
.range-background-quadrant-02 {
  min-height: 350px;
  flex: 1;
  background-color: #778899;
}
.range-background-quadrant-02-text {
  padding: 10px;
  font-size: 1rem;
  font-family: "SejongGeulggot";
  font-weight: 700;
  letter-spacing: 0.15em;
  color: white;
}
.range-background-quadrant-01 {
  min-height: 350px;
  flex: 9;
  border-left: 1px solid black;
}
.range-background-quadrant-bottom {
  position: relative;
  height: 50px;
  display: flex;
}
.range-background-quadrant-03 {
  height: 50px;
  flex: 1;
  border-top: 1px solid black;
}
.range-background-quadrant-04 {
  height: 50px;
  flex: 9;
  border-left: 1px solid black;
  border-top: 1px solid black;
}
.range-background-bottom-grid {
  position: absolute;
  top: -3px;
  left: 10%;
  height: 8px;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 1fr;
  z-index: 2;
}
.range-background-bottom-grid-line {
  border-right: 1px solid black; /* 세로선 */
  height: 100%;
}
.range-background-bottom-grid-text {
  position: absolute;
  top: 10px;
  left: 8%;
  height: 20px;
  width: 93.75%;
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  grid-template-rows: 1fr;
  text-align: center;
  font-size: 0.75rem;
  font-family: "SejongGeulggot";
  font-weight: 700;
}

/* items */
.range-items-box {
  position: absolute;
  top: 0;
  left: 10%;
  min-height: 350px;
  width: 90%;
  /* z-index: 2; */
}
.range-items-grid {
  display: flex;
  flex-direction: column;
  min-height: 350px;
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
  font-family: "SejongGeulggot";
  font-weight: 700;
  font-size: 0.75rem;
}
.range-items-grid-box {
  height: max-content;
  padding: 10px 0;
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
}
.grid-circle-left {
  left: -5px;
}
.grid-circle-right {
  right: -5px;
}
.range-items-grid-line {
  height: 2px;
}
</style>