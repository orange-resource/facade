<template>
  <div class="container">
    <div class="top-box">
      <h1 class="title">橘子橘子</h1>
      <div class="description">
        <p>巨嘴234风格电饭锅电饭锅电饭锅的范甘迪发鬼地方个垫付大范甘迪放电饭锅</p>
      </div>
      <div class="button-group button-group-media">
        <Button class="button">
          <Icon type="ios-arrow-back"></Icon>
          Backward
        </Button>
        <Button class="button">
          <Icon type="ios-arrow-back"></Icon>
          Backward
        </Button>
        <Button class="button">
          <Icon type="ios-arrow-back"></Icon>
          Backward
        </Button>
      </div>
    </div>
    <div class="bottom-box">
      <Row type="flex" justify="center">

        <Col class="card-box" :xs="20" :sm="20" :md="20" :lg="20">

          <Card v-for="(item,index) in 20" class="card">
            <div style="text-align:center">
              <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png">
              <h3>A high quality UI Toolkit based on Vue.js</h3>
            </div>
          </Card>

        </Col>

      </Row>
    </div>
    <div class="footer">@ jusdnfds</div>
  </div>
</template>

<script>
  export default {
    asyncData({app}, callback) {
      app.head.link = [
        { rel: 'icon', type: 'image/x-icon', href: 'http://www.ongsat.com/favicon.ico' }
      ]
      app.head.title = 'new title2'
      callback(null, {})
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
  }
  .top-box {
    width: 100%;
    height: 300px;
    background-color: #2d8cf0;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #ffffff;
      font-size: 50px;
    }
    .description {
      width: 80%;
      display: flex;
      justify-content: center;
      p {
        color: #ffffff;
        font-size: 15px;
        font-weight: 600;
      }
    }
    .button-group {
      width: 80%;
    }
    @media all and (min-width: 992px) {
      .button-group-media {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .button {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
    @media all and (max-width: 992px) {
      .button-group-media {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .button {
          margin-top: 5px;
          margin-bottom: 5px;
        }
      }
    }
  }
  .bottom-box {
    margin-top: 30px;
    .card-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .card {
      cursor: pointer;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 20px;
      width: 320px;
    }
  }
  .footer {
    margin-top: 50px;
    height: 100px;
    background-color: #17233d;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 600;
  }
</style>
