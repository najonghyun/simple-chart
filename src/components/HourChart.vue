<template>
  <div class="hour-chart-container">
    <wj-flex-chart
      :itemsSource="chartData"
      bindingX="hour"
      selectionMode="Point"
      :palette="['rgba(119, 136, 153, 1)']"
    >
      <wj-flex-chart-legend position="Top"> </wj-flex-chart-legend>
      <wj-flex-chart-series name="포함 개수" binding="count">
      </wj-flex-chart-series>
      <wj-flex-chart-axis
        wj-property="axisX"
        title="시간 별 (hour)"
        :majorUnit="1"
      ></wj-flex-chart-axis>
      <wj-flex-chart-axis wj-property="axisY" title="포함 개수" :majorUnit="1">
      </wj-flex-chart-axis>
      <wj-flex-chart-data-label
        content="{y}"
        :offset="5"
      ></wj-flex-chart-data-label>
      <wj-flex-chart-animation></wj-flex-chart-animation>
    </wj-flex-chart>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { convertToSeconds } from "@/utils/filters";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      filteredDates: "filteredDates",
      selectedDate: "selectedDate",
    }),
    chartData() {
      return Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: this.rangeCheck(hour),
      }));
    },
    // calculateRange() : 범위별로 표본이 겹치는 수를 계산하는 함수
    calculateRange() {
      const events = [];
      // 1. filteredDate를 각 초로 변환 (이 때 시작 지점(start)에서는 포함을 시작하므로 +1을 더하고, 끝 지점(end)에서는 포함되지 않으므로 -1을 뺌)
      this.filteredDates.forEach(({ start, end }) => {
        events.push({ time: convertToSeconds(start), type: +1 });
        events.push({ time: convertToSeconds(end), type: -1 });
      });
      // 2. 오름차순 정렬
      events.sort((a, b) => a.time - b.time || a.type - b.type);
      let count = 0;
      const range = [];
      // 3. 하나씩 보면서 start면 +1하고 end면 -1하면서 범위와 함께 range배열에 추가
      for (let i = 0; i < events.length - 1; i++) {
        count += events[i].type;
        const currentTime = events[i].time;
        const nextTime = events[i + 1].time;
        range.push({
          start: currentTime,
          end: nextTime,
          count: count,
        });
      }
      return range;
    },
  },
  methods: {
    // rangeCheck(hour) : caculateRange[]배열에 저장된 범위 중 특정 시간(hour)에 해당하는 범위의 count 값을 계산하는 함수
    rangeCheck(hour) {
      const currentDate = new Date(this.selectedDate);
      currentDate.setHours(hour, 0, 0, 0);

      const timeInSeconds = convertToSeconds(currentDate);
      // 시작은 포함, 끝은 미 포함
      const result = this.calculateRange.find(
        (time) => timeInSeconds >= time.start && timeInSeconds < time.end
      );
      return result ? result.count : 0;
    },
  },
};
</script>
<style>
.hour-chart-container {
  position: relative;
  height: 410px;
  width: 100%;
  margin-top: 25px;
  background-color: #fdf0df;
}
</style>