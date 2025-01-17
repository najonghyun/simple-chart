<template>
  <div class="qa-container">
    <div class="qa-title">※ 표본 그래프 참고 사항</div>
    <div class="qa content">
      - 표본 수는 1 이상의 양수만 입력할 수 있습니다.<br />
      - 표본 생성 시 차트를 쉽게 볼 수 있도록 오늘 기준 '최근 3일'에 해당하는
      범위 내에서 데이터가 랜덤으로 생성됩니다. <br />
      - 조회 후 범위 표본 hover시 정확한 시간을 확인할 수 있습니다.
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.qa-container {
  position: absolute;
  background-color: #fdf0df;
  z-index: 2;
  top: 60px;
  border-radius: 15px;
  border-top-left-radius: 0;
}
.qa-title {
  padding: 10px;
  font-family: "SejongGeulggot";
  font-weight: 600;
  font-size: 1.5rem;
}
.qa.content {
  padding: 0 10px;
  padding-bottom: 10px;
  line-height: 1.7em;
  font-family: "SejongGeulggot";
}
</style>