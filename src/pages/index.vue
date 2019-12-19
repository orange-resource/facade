<template>
  <div class="container">
    <div v-if="systemConfig !== null" class="top-box">
      <h1 class="title">{{ systemConfig.pageMainTitle }}</h1>
      <div class="description">
        <p>{{ systemConfig.pageMainDescription }}</p>
      </div>
      <div v-if="buttonGroup.length > 0" class="button-group button-group-media">
        <a-link v-for="(item,index) in buttonGroup"
           :key="'button' + index"
           :to="item.openUrl"
           target="_blank">
          <simple-button :icon="item.icon" :text="item.text"></simple-button>
        </a-link>
      </div>
    </div>
    <div v-if="systemConfig === null" class="top-box">
      <none>
        <span class="none-span">空空如也...</span>
      </none>
    </div>
    <div v-if="sectionList.length > 0" class="bottom-box">
      <Row type="flex" justify="center">

        <Col class="card-box" :xs="22" :sm="22" :md="22" :lg="20">

          <a-link v-for="(item,index) in sectionList"
                  v-if="item.showStatus === 1"
                  :key="'card' + index"
                  :to="item.onStatus === 1 ? item.openUrl : 'javascript:void(0)'"
                  :target="item.onStatus === 1 ? '_blank' : '_self'">
            <section-box :data="item"></section-box>
          </a-link>

        </Col>

      </Row>
    </div>
    <div v-if="sectionList.length === 0" class="bottom-box">
      <none>
        <span class="none-span" style="color: #909399">空空如也...</span>
      </none>
    </div>
    <div class="footer">
      <span v-if="systemConfig !== null">
        {{ systemConfig.footerInfo }}
      </span>
    </div>

    <div class="concat-container">
      <div class="concat-box animated flipInX delay-1s">
<!--        <el-popover-->
<!--          class="concat-box-popover"-->
<!--          placement="right-start"-->
<!--          title="二维码"-->
<!--          width="200"-->
<!--          trigger="hover">-->
<!--          <div>-->
<!--            <img-->
<!--              width="100%"-->
<!--              src="https://qr.api.cli.im/qr?data=qq&level=H&transparent=0&bgcolor=%23FFFFFF&forecolor=&blockpixel=12&marginblock=2&logourl=&size=400&text=&logoshape=no&fontsize=30&fontfamily=msyh.ttf&fontcolor=&incolor=&outcolor=&qrcode_eyes=&background=images%2Fbackground%2Fbg19.png&wper=0.62&hper=0.62&tper=0.28&lper=0.19&eye_use_fore=1&qrpad=10&kid=bizcliim&time=1575604825&key=72af07a7cf906c7b7cd40563f11b19a9">-->
<!--          </div>-->
<!--          <icon slot="reference" id="concat-icon" name="qq" scale="5"></icon>-->
<!--        </el-popover>-->
<!--        <el-popover-->
<!--          class="concat-box-popover"-->
<!--          placement="right-start"-->
<!--          title="二维码"-->
<!--          width="200"-->
<!--          trigger="hover">-->
<!--          <div>-->
<!--            <img-->
<!--              width="100%"-->
<!--              src="https://qr.api.cli.im/qr?data=qq&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=1891ffac061c0c5abab3b58092883ea2">-->
<!--          </div>-->
<!--          <icon slot="reference" id="concat-icon" name="wechat" scale="5"></icon>-->
<!--        </el-popover>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData(content) {

      const data = {
        systemConfig: null,
        buttonGroup: [],
        sectionList: []
      }

      await content.app.$axios.post('/system/config/get').then((res) => {
        if (res.status === 200) {
          const da = res.data
          if (da.code === 200) {
            if (da.data !== null) {
              data.systemConfig = da.data
              content.app.head.link = [
                { rel: 'icon',
                  type: 'image/x-icon',
                  href: da.data.logoUrl
                }
              ]
              content.app.head.title = da.data.title
              content.app.head.meta = [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: da.data.description }
              ]
            }
          }
        }
      })

      await content.app.$axios.post('/buttonGroup/getList').then((res) => {
        if (res.status === 200) {
          const da = res.data
          if (da.code === 200) {
            data.buttonGroup = da.data
          }
        }
      })

      await content.app.$axios.post('/section/getList').then((res) => {
        if (res.status === 200) {
          const da = res.data
          if (da.code === 200) {
            data.sectionList = da.data
          }
        }
      })

      return data
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
    border-bottom: 2px solid #e8eaec;
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

  .concat-container {
    position: fixed;
    right: 20px;
    top: 35%;
    .concat-box {
      display: flex;
      flex-direction: column;
      #concat-icon {
        border-radius: 50%;
        cursor: pointer;
      }
      .concat-box-popover:nth-child(n+2) {
        margin-top: 10px;
      }
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
