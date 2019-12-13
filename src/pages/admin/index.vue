<template>
  <div class="container">
    <div class="box">
      <div class="login-box animated bounce">
        <div class="title-box">
          <h2>登录</h2>
        </div>
        <div class="content-box">
          <Input class="input" placeholder="请输入管理员账号">
            <Icon type="ios-contact" slot="prefix" />
          </Input>
          <Input class="input" placeholder="请输入管理员密码">
            <Icon type="ios-contact" slot="prefix" />
          </Input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>
 .container {
   width: 100%;
   height: 100%;
   background-color: #8EC5FC;
   background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
 }
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
 .login-box {
   width: 500px;
   height: 300px;
   background-color: #FFDEE9;
   background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
   border-radius: 10px;
   // 1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
   box-shadow: 5px 10px 15px 2px rgba(0,0,0,0.1);
   .title-box {
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     height: 80px;
   }
   .content-box {
     flex: 1;
     display: flex;
     flex-direction: column;
     align-items: center;
     .input {
       width: 250px;
     }
     .input:nth-child(n+ 2) {
       margin-top: 10px;
     }
   }
 }
</style>
