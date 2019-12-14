<template>
  <div class="container">
    <div class="box">
      <div>
        <h1 v-if="error.statusCode === 404">
          404
        </h1>
        <h1 v-else>
          500服务器错误
        </h1>
      </div>
      <div>
        <p v-if="error.statusCode === 404" class="description">
          抱歉，您访问的资源不存在或者已经被删掉
        </p>
        <p v-else class="description">
          服务器突如其来的崩溃!!!!!
        </p>
      </div>
      <div style="margin-top: 15px">
        <nuxt-link to="/">
          <Button type="success" long>
            去往首页
          </Button>
        </nuxt-link>
      </div>
    </div>
    <div style="position: fixed;top: 50px;width: 80%">
      <Alert show-icon>
        联系客服方式
        <Icon slot="icon" type="ios-bulb-outline" />
        <template slot="desc">
          {{ description }}
        </template>
      </Alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  data () {
    return {
      description: 'QQ号: ' + process.env.qq + '  微信号: ' + process.env.weChat
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #08AEEA;
    background-image: linear-gradient(0deg,#08AEEA 0%,#2AF598 100%);
    background-image: -webkit-linear-gradient(0deg,#08AEEA 0%,#2AF598 100%);
    background-image: -moz-linear-gradient(0deg,#08AEEA 0%,#2AF598 100%);
    background-image: -o-linear-gradient(0deg,#08AEEA 0%,#2AF598 100%);
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    color: #ffffff;
  }
  .description {
    color: #ffffff;
    font-size: 14px;
  }
  .button {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
