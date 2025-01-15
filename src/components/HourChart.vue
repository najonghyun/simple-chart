<template>
  <div class="hour-chart-container">
    {{ date }}
    <wj-flex-chart :itemsSource="data" bindingX="hour" selectionMode="Point">
      <wj-flex-chart-legend position="Top"> </wj-flex-chart-legend>
      <wj-flex-chart-series name="count" binding="count">
      </wj-flex-chart-series>
      <wj-flex-chart-axis
        wj-property="axisX"
        title="Hour"
        :majorUnit="1"
      ></wj-flex-chart-axis>
      <wj-flex-chart-data-label content="{y}"></wj-flex-chart-data-label>
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
  margin-top: 25px;
  background-color: #fdf0df;
}
</style>