<template>
  <div id="app">
    <div class="container">
      <TopMenu />
      <RangeGragh />
      <HourChart v-if="isCheck" />
    </div>
  </div>
</template>

<script>
import TopMenu from "./components/TopMenu.vue";
import RangeGragh from "./components/RangeGragh.vue";
import HourChart from "./components/HourChart.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    TopMenu,
    RangeGragh,
    HourChart,
  },
  computed: {
    ...mapState({ isCheck: "isCheck" }),
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
}
.container {
  max-width: 100%;
  height: calc(100vh - 60px);
  padding: 30px;
}
</style>
