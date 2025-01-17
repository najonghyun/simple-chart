<template>
  <div class="menu-container">
    <QaBox v-if="isQa" />
    <form class="menu-box" @submit.prevent="onSubmit">
      <div class="menu-qa" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
        <b-icon :icon="isQa ? 'info-circle-fill' : 'info-circle'"></b-icon>
      </div>
      <div class="menu-date">
        <div class="menu-date-text">날짜</div>
        <div class="menu-date-datepicker">
          <b-form-datepicker
            id="datepicker"
            v-model="inputDate"
            selected-variant="primary"
            :max="max"
            locale="ko"
            @input="onChangeDate"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="menu-specimen">
        <div class="menu-specimen-text">표본 수</div>
        <input
          class="menu-specimen-input"
          type="number"
          placeholder="숫자"
          v-model="inputNumber"
          ref="input"
        />
      </div>
      <button class="menu-check-button" type="submit">조회</button>
    </form>
  </div>
</template>
<script>
import QaBox from "./QaBox.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { QaBox },
  data() {
    return {
      isQa: false,
      inputDate: "",
      max: "",
      inputNumber: "",
    };
  },
  created() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const maxDate = new Date(today);
    this.SET_SELECTEDDATE(today);
    this.inputDate = today;
    this.max = maxDate;
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    ...mapMutations(["SET_SELECTEDDATE", "SET_ISCHECKSUBMIT"]),
    ...mapActions(["ADD_DATES", "UPDATE_DATE"]),
    onMouseOver() {
      this.isQa = true;
    },
    onMouseLeave() {
      this.isQa = false;
    },
    onSubmit() {
      const temp = this.inputNumber;
      if (temp < 1) return alert("0보다 큰 수로 다시 입력하세요!");
      this.ADD_DATES(temp);
      this.SET_ISCHECKSUBMIT(true);
    },
    onChangeDate() {
      this.UPDATE_DATE(this.inputDate);
      console.log(this.inputDate);
    },
  },
};
</script>
<style>
.menu-container {
  width: 100%;
}
.menu-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu-qa {
  position: absolute;
  left: -25px;
}
.menu-date {
  display: flex;
  align-items: center;
}
.menu-date-text {
  font-family: "SejongGeulggot";
  font-weight: 700;
}
.menu-date-datepicker {
  margin-left: 10px;
  width: 250px;
}

.menu-specimen {
  display: flex;
  align-items: center;
}
.menu-specimen-text {
  font-family: "SejongGeulggot";
  font-weight: 700;
}
.menu-specimen-input {
  margin-left: 10px;
  height: 38px;
  width: 120px;
  padding-left: 10px;
  border-radius: 10px;
  border: gray 1px solid;
  font-size: 1rem;
}
.menu-check-button {
  margin-left: 5px;
  height: 40px;
  width: 80px;
  border-radius: 10px;
  border: none;
  background-color: #778899;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: "SejongGeulggot";
  cursor: pointer;
}
.menu-check-button:hover {
  background-color: #657381;
}
</style>