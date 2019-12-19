<template>
  <Card class="card">
    <div class="box">
      <img v-lazy="data.mainPicture">
      <h3>{{ data.name }}</h3>
      <p>{{ data.description }}</p>
    </div>
    <div v-if="data.onStatus === 2" class="off-box">
      {{ data.offText }}
    </div>
  </Card>
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
    width: 320px;
    position: relative;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        height: 260px;
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
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 60px;
      background-color: #e8eaec;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 900;
      color: #515a6e;
    }
  }
</style>
