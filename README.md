# 📊 최대 사용량 그래프 구현 &nbsp; <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>

#### 랜덤으로 표본들을 생성하고 그 시간의 최대 사용량을 차트로 나타내보았습니다.

### https://simple-chart.vercel.app/

---

### 웹 / 개인 미니 프로젝트

### 2025.01.13 ~ 2025.01.20

> **동적 UI 요소 제어와 애니메이션을 포함한 레이아웃 구성 및 기능 개발**

---

### 💻 Overview

### 초기 화면

<img src="https://github.com/user-attachments/assets/4477e123-fe90-42fa-b8be-5eac1c9fbebe" width="70%" height="70%">

### 조회 클릭 시

<img src="https://github.com/user-attachments/assets/41b7add6-06e4-4959-89c4-027f74e8f5d8" width="70%" height="70%">

### hover 및 가이드라인

<img src="https://github.com/user-attachments/assets/518d1f22-0224-46af-9d41-a7a2785216f6" width="70%" height="70%">

<br>

---

### 💡 기획

표본 데이터를 범위 그래프로 시각화하고, 시간별 최대 사용량을 차트 그래프로 구현했습니다.

이 프로젝트는 학습 목적으로 Vue, Bootstrap, Wijmo 라이브러리를 활용하여 웹 사이트 형태로 제작했습니다.

특히, 최대 사용량 계산 시 시간 복잡도를 최소화하는 효율적인 알고리즘 구현에 중점을 두었습니다.

### 🖇️ 기능

> ### 📝 표본 개수 입력

-   최소 1개부터 입력 가능
-   입력 후 조회버튼 클릭 시 표본의 개수만큼 현재 날짜에서 3일 이내로 범위 그래프에 랜덤 생성

> ### 📝 표본 hover 및 hour 가이드 라인

-표본에 마우스를 올리면 정확한 시간을 확인 가능

-   버튼을 통해 빨간 선으로 시간별 수직 가이드라인 표시

> ### 📝 범위 그래프 직접 제작

-   css의 position: absolute와 display: grid를 이용하여 라이브러리를 사용하지 않고 제작
-   표본이 많아져서 height가 커졌을 때 watch를 사용하여 dom에 접근 해 동적으로 height 제어

> ### 🎲 정렬을 이용한 알고리즘

-   position: absolute와 display: grid를 활용하여 라이브러리 없이 직접 구현
-   표본 증가로 height가 커질 경우, watch로 감시하고, DOM에 동적으로 접근하여 height를 자동 조정

### ⚒️ 개발 환경

#### **FrontEnd**

-   node.js : 16.14.2
-   Vue : 2.6.14
-   Vuex : 3.6.2
-   Bootstrap Vue : 2.23.1
-   Wijmo : 5.20242.30

<br>
