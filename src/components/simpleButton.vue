<template>
  <button class="button">
    <Icon :type="icon" size="20" />
    <span class="text">
      {{ text }}
    </span>
  </button>
</template>

<script>
  export default {
    name: 'simpleButton',
    props: {
      icon: {
        type: String
      },
      text: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button {
    margin: 0;
    outline: none;

    width: 146px;
    height: 46px;

    background-color: #ffffff;
    border: none;
    color: #2d8cf0;
    padding: 2px;
    font-size: 16px;
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #409EFF;
    }
  }
</style>
