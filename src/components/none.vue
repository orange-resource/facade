<template>
  <div class="box">
    <icon name="none" scale="10"></icon>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'none',
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
