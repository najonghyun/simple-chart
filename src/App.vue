<template>
  <div id="app">
    <div class="container">
      <TopMenu />
      <RangeGragh />
    </div>
  </div>
</template>

<script>
import TopMenu from "./components/TopMenu.vue";
import RangeGragh from "./components/RangeGragh.vue";

export default {
  name: "App",
  components: {
    TopMenu,
    RangeGragh,
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
