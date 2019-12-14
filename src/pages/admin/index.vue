<template>
  <div class="container">
    2
  </div>
</template>

<script>
  export default {
    name: 'Index',
    layout: 'admin',
    middleware: 'userAuth',
    mounted () {
      this.$axios.$post('/test').then((res) => {
        console.log(res)
      })
    }
  }
</script>

<style lang="scss" scoped>
 .container {
   width: 100%;
   height: 100%;
 }
</style>
