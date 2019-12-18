<template>
  <div class="container">
  </div>
</template>

<script>
  export default {
    name: 'Index',
    layout: 'admin',
    middleware: 'userAuth',
    mounted () {
      this.$router.push('/admin/section')
    }
  }
</script>

<style lang="scss" scoped>
 .container {
   width: 100%;
   height: 100%;
 }
</style>
