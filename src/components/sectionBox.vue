<template>
  <div class="card">
    <div class="box">
      <img v-lazy="data.mainPicture">
      <h3>{{ data.name }}</h3>
      <p class="text-line-feed3">{{ data.description }}</p>
    </div>
    <div v-if="data.onStatus === 2" class="off-box">
      {{ data.offText }}
    </div>
    <div v-if="data.openUrl !== ''" class="open">
      <span>点击查看详情</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sectionBox',
    props: {
      data: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #EBEEF5;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 320px;
    position: relative;
    transition: transform 0.2s;
    height: 265px;
    &:hover {
      transform: translate(0, -10px);
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        height: 120px;
        border-radius: 5px;
      }
      h3 {
        margin-top: 10px;
        color: #17233d;
        font-weight: 600;
      }
      p {
        margin-top: 5px;
        color: #515a6e;
        font-weight: 400;
      }
    }

    .off-box {
      margin-left: -80%;
      width: 80%;
      position: absolute;
      top: 10px;
      left: 50%;
      height: 60px;
      background-color: #E4E7ED;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 900;
      color: #515a6e;
    }

    .open {
      width: 100%;
      position: absolute;
      bottom: 5px;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
      span {
        font-weight: 900;
        color: #c5c8ce;
        font-size: 10px;
      }
    }
  }
</style>
