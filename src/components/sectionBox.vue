<template>
  <div class="card">
    <div class="box">
      <img v-lazy="data.mainPicture">
      <h3>{{ data.name }}</h3>
      <p class="text-line-feed3">{{ data.description }}</p>
    </div>
    <div v-if="data.onStatus === 2" class="off-box animated infinite pulse slow">
      <Icon type="md-information-circle" size="20" style="margin-right: 5px" />
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
    margin-left: 20px;
    margin-right: 30px;
    margin-bottom: 40px;
    padding: 15px;
    border: 1px solid #EBEEF5;
    background-color: #ffffff;
    box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    width: 320px;
    position: relative;
    transition: transform 0.2s;
    height: 300px;
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
        margin-top: 20px;
        color: #303133;
        font-weight: 600;
      }
      p {
        margin-top: 8px;
        color: #909399;
        font-weight: 400;
      }
    }

    .off-box {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -150px;
      width: 300px;
      height: 40px;
      background-color: #303133;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      color: #ffffff;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .open {
      width: 100%;
      position: absolute;
      bottom: 15px;
      display: flex;
      justify-content: flex-end;
      padding-right: 36px;
      span {
        font-weight: 600;
        color: rgba(0,0,0,0.25);
        font-size: 10px;
      }
    }
  }
</style>
