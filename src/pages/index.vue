<template>
  <div class="container">
    2
  </div>
</template>

<script>
  export default {
    asyncData({app}, callback) {
      app.head.link = [
        { rel: 'icon', type: 'image/x-icon', href: 'http://www.ongsat.com/favicon.ico' }
      ]
      app.head.title = 'new title'
      callback(null, {})
    }
  }
</script>

<style lang="scss" scoped>
</style>
