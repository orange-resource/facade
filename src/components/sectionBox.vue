<template>
  <Card class="card">
    <div class="box">
      <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png">
      <h3>A high quality UI Toolkit based on Vue.js</h3>
      <p>
        A high quality UI Toolkit based on Vue.js
        A high quality UI Toolkit based on Vue.js
        A high quality UI Toolkit based on Vue.js
      </p>
    </div>
    <div class="off-box">该功能还未上线，敬请期待</div>
  </Card>
</template>

<script>
  export default {
    name: 'sectionBox'
  }
</script>

<style lang="scss" scoped>
  .card {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    width: 320px;
    position: relative;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        height: 260px;
      }
      h3 {
        margin-top: 10px;
      }
      p {
        margin-top: 5px;
      }
    }

    .off-box {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 60px;
      background-color: #e8eaec;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: #515a6e;
    }
  }
</style>
