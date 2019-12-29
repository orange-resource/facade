<template>
  <div v-if="show" class="pop">
    <div class="mask"></div>
    <div class="modal modal-width">
      <Icon class="close" type="md-close-circle" size="36" @click="show = false" />
      <a-link :to="to !== '' ? to : 'javascript:void(0)'">
        <img :src="url">
      </a-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "popBox",
    props: {
      url: {
        type: String
      },
      to: {
        type: String
      }
    },
    data () {
      return {
        show: true
      }
    }
  }
</script>


<style lang="scss" scoped>
  .pop {
    width: 100%;
    height: 100%;
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 999999;
      filter: alpha(opacity = 90);
      opacity: 0.3;
      background-color: #F2F6FC;
    }
    @media all and (min-width: 1400px) {
      .modal-width {
        width: 20%;
      }
    }
    @media all and (max-width: 1400px) {
      .modal-width {
        width: 26%;
      }
    }
    @media all and (max-width: 1200px) {
      .modal-width {
        width: 26%;
      }
    }
    @media all and (max-width: 1024px) {
      .modal-width {
        width: 30%;
      }
    }
    @media all and (max-width: 768px) {
      .modal-width {
        width: 36%;
      }
    }
    @media all and (max-width: 375px) {
      .modal-width {
        width: 60%;
      }
    }
    .modal {
      height: 100%;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
      z-index: 99999999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        height: auto;
        z-index: 9999999999;
        cursor: pointer;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
      }
      .close {
        cursor: pointer;
        margin-bottom: 10px;
      }
    }
  }
</style>
