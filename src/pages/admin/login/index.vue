<template>
  <div class="container">
    <div class="box">
      <div class="login-box animated bounce">
        <div class="title-box">
          <h2>橘子后台管理系统</h2>
        </div>
        <div class="content-box">
          <Input v-model="username" class="input" clearable placeholder="请输入管理员账号">
            <Icon type="ios-contact" slot="prefix" />
          </Input>
          <Input v-model="password"
                 class="input"
                 clearable
                 type="password"
                 @on-enter="login"
                 placeholder="请输入管理员密码">
            <Icon type="md-ionitron" slot="prefix" />
          </Input>
          <Button class="login-button" type="success" :loading="loading" @click="login()">登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cookie from 'js-cookie'

  export default {
    name: 'Index',
    data () {
      return {
        loading: false,
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        if (this.username === '') {
          this.$Message.info('账户名不能为空')
          return
        } else if (this.password === '') {
          this.$Message.info('密码不能为空')
          return
        }

        this.loading = true
        this.$axios.$post('/login', {
          username: this.username,
          password: this.password
        }).then((res) => {
          this.loading = false
          if (res.code === 1000) {
            this.$Message.success('登录成功...正在跳转')
            cookie.set('token', res.data.token, { expires: 7 })
            this.$router.push('/admin')
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.loading = false
        })
      }
    }
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
      height: 110px;
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
      .login-button {
        margin-top: 30px;
      }
    }
  }
</style>
