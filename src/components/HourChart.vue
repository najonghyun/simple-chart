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
    // chartData() : 시간 별로 최대 사용량 계산하는 변수
    chartData() {
      // 1. // 각 시간대의 count 초기화
      const resultHours = Array(24).fill(0);

      // 2. 범위를 순회하며 시간을 추출해 그 안에서의 max값을 반영
      this.calculateRange.forEach((range) => {
        const startHour = Math.floor(range.start / 3600);
        const endHour = Math.ceil(range.end / 3600);

        for (let hour = startHour; hour < endHour; hour++) {
          resultHours[hour] = Math.max(resultHours[hour], range.count);
        }
      });
      return resultHours.map((count, hour) => ({ hour, count }));
    },
    // calculateRange() : 범위별로 표본이 겹치는 수를 계산하는 변수
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
  methods: {},
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