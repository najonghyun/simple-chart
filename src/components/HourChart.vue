<template>
  <div class="hour-chart-container">
    <wj-flex-chart
      :itemsSource="data"
      bindingX="hour"
      selectionMode="Point"
      :palette="['rgba(119, 136, 153, 1)']"
    >
      <wj-flex-chart-legend position="Top"> </wj-flex-chart-legend>
      <wj-flex-chart-series name="포함 개수" binding="count" :offset="20">
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

export default {
  data() {
    return {
      // data: Array.from({ length: 24 }, (_, hour) => ({
      //   hour,
      //   count: this.queryOverlap(hour),
      // })),
    };
  },
  computed: {
    ...mapState({ filteredDates: "filteredDates", date: "date" }),
    data() {
      return Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: this.queryOverlap(hour),
      }));
    },
    calculateRange() {
      const events = [];
      this.filteredDates.forEach(({ start, end }) => {
        events.push({ time: this.convertToSeconds(start), type: +1 });
        events.push({ time: this.convertToSeconds(end), type: -1 });
      });
      events.sort((a, b) => a.time - b.time || a.type - b.type);
      let count = 0;
      const range = [];
      for (let i = 0; i < events.length - 1; i++) {
        count += events[i].type; // 현재 이벤트로 겹침 계산
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
    convertToSeconds(date) {
      // date = new Date(date);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return hours * 3600 + minutes * 60 + seconds;
    },
    queryOverlap(hour) {
      const currentDate = new Date(this.date);
      currentDate.setHours(hour, 0, 0, 0);

      const timeInSeconds = this.convertToSeconds(currentDate);
      const result = this.calculateRange.find(
        (interval) =>
          // 시작은 포함, 끝은 미 포함
          timeInSeconds >= interval.start && timeInSeconds < interval.end
      );
      return result ? result.count : 0;
    },
  },
};
</script>
<style>
.hour-chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  margin-top: 25px;
  background-color: #fdf0df;
}
</style>