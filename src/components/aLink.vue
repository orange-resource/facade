<template>
  <a class="a" :href="to" :target="target">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'aLink',
    props: {
      to: {
        type: String
      },
      target: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .a {
    text-decoration: none;
    out-line: none;
    outline: none;
  }
  .a {
    text-decoration: none;
  }
  /*正常的未被访问过的链接*/
  .a:link {
    text-decoration: none;
  }
  /*已经访问过的链接*/
  .a:visited {
    text-decoration: none;
  }
  /*鼠标划过(停留)的链接*/
  .a:hover {
    text-decoration: none;
  }
  /* 正在点击的链接*/
  .a:active {
    text-decoration: none;
  }
</style>
