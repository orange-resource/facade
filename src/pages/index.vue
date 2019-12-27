<template>
  <div class="container">
    <!--  头部  -->
    <div :class="{ 'visibility': showSmallTop }" class="top-box">
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
      <div class="category">
        <Icon type="md-list-box" size="30"
              @click="openCategory = true" />
      </div>
      <Drawer placement="left"
              :closable="false"
              width="250"
              v-model="openCategory">
        <div class="category-count">
          <span>总共有9个分类</span>
        </div>
        <div style="margin-top: 10px">
          <Button type="primary"
                  @click="position('324242424234234')"
                  :long="true">推荐</Button>
        </div>
      </Drawer>
    </div>
    <div v-if="showSmallTop === true" class="top-small-box">
      <h1 class="title">{{ systemConfig.pageMainTitle }}</h1>
      <div class="category">
        <Icon type="md-list-box"
              @click="openCategory = true"
              size="30" />
      </div>
    </div>
    <!--  下方卡片  -->
    <div id="bottom" v-if="sectionList.length > 0" class="bottom-box">
      <Row type="flex" justify="center">

        <Col class="" :xs="22" :sm="22" :md="22" :lg="20">

          <div :id="324242424234234" class="category">
            <span class="category-title">推荐</span>
          </div>
          <div class="card-box card-box-center">
            <a-link
                    v-for="(item,index) in sectionList"
                    :key="'card' + index"
                    :to="item.onStatus === 1 ? item.openUrl : 'javascript:void(0)'"
                    :target="item.onStatus === 1 ? '_blank' : '_self'">
              <section-box :data="item"></section-box>
            </a-link>
          </div>

        </Col>

      </Row>
    </div>
    <div v-if="sectionList.length === 0" class="bottom-box">
      <none>
        <span class="none-span" style="color: #909399">空空如也...</span>
      </none>
    </div>
    <!--  底部  -->
    <div class="footer">
      <span v-if="systemConfig !== null">
        {{ systemConfig.footerInfo }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData(content) {

      const data = {
        systemConfig: {},
        buttonGroup: [],
        sectionList: []
      }

      const api = process.env.devApi

      await content.app.$axios.post(api + '/system/config/getConfig').then((res) => {
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

      await content.app.$axios.post(api + '/buttonGroup/getButtonList').then((res) => {
        if (res.status === 200) {
          const da = res.data
          if (da.code === 200) {
            data.buttonGroup = da.data
          }
        }
      })

      await content.app.$axios.post(api + '/section/getSectionList').then((res) => {
        if (res.status === 200) {
          const da = res.data
          if (da.code === 200) {
            data.sectionList = da.data
          }
        }
      })

      return data
    },
    mounted () {
      this.handleScroll()
      window.addEventListener('scroll', this.handleScroll)
    },
    data () {
      return {
        showSmallTop: false,
        openCategory: false
      }
    },
    methods: {
      handleScroll () {
        const scrollTop = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop
        const offsetTop = document.getElementById("bottom").offsetTop
        this.showSmallTop = scrollTop > offsetTop - 90
      },
      position (id) {
        console.log(id)
        const scrollTop = document.getElementById(id)
        console.log(scrollTop)
        window.pageYOffset = scrollTop
        document.documentElement.scrollTop = scrollTop
        document.body.scrollTop = scrollTop
        this.openCategory = false
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
  }
  .visibility {
    visibility: hidden;
  }
  .category-count {
    width: 100%;
    color: #c5c8ce;
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
  }
  .top-small-box {
    position: fixed;
    top: 0;
    width: 100%;
    height: 65px;
    background-color: #2d8cf0;
    z-index: 999;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .category {
      color: #ffffff;
      position: absolute;
      top: 20px;
      right: 20px;
      font-weight: 900;
      cursor: pointer;
    }
    .title {
      color: #ffffff;
      font-size: 30px;
      margin-left: 15px;
    }
  }
  .top-box {
    width: 100%;
    height: 300px;
    background-color: #2d8cf0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .category {
      color: #ffffff;
      position: absolute;
      top: 20px;
      right: 20px;
      font-weight: 900;
      cursor: pointer;
    }
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
    .category {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      .category-title {
        font-weight: 600;
        color: #17233d;
        font-size: 20px;
      }
    }
    .card-box {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
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
