<template>
  <div class="dashed-container">
    <div class="dashed-text">
      hour<br />
      가이드 선
    </div>
    <button
      :class="['dashed-button', { 'dashed-button-active': active }]"
      @click="onClickButton"
    >
      <div class="dashed-button-text">{{ text }}</div>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    onClickButton: Function,
    text: String,
    active: Boolean,
  },
};
</script>
<style>
.dashed-container {
  display: flex;
  align-items: center;
}
.dashed-text {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: "SejongGeulggot";
}
.dashed-button {
  margin-left: 5px;
  border: none;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  background-color: lightgray;
  color: gray;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.dashed-button-active {
  color: white;
  background-color: red;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.dashed-button-text {
  font-size: 0.6815rem;
  font-weight: 600;
  font-family: "SejongGeulggot";
}
</style>