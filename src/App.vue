<template>
  <div id="app">
    <div class="container">
      <TopMenu />
      <RangeGragh />
      <HourChart v-if="isCheckSubmit" />
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
    ...mapState({ isCheckSubmit: "isCheckSubmit" }),
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
#app {
  height: 100vh;
  overflow-y: scroll;
}
.container {
  padding-top: 30px;
  align-content: center;
}
</style>
