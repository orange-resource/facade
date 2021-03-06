<template>
  <div class="container">
    <!--  弹出框 -->
    <pop-box v-if="systemConfig && systemConfig.showPopStatus === 1"
             :url="systemConfig.popImageUrl" :to="systemConfig.popOpenUrl"></pop-box>
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
              width="280"
              v-model="openCategory">
        <div class="category-count">
          <span>总共有{{ categoryList.length }}个分类</span>
        </div>
        <div v-for="(item, index) in categoryList" :key="'ca' + index" style="margin-top: 10px">
          <Button type="primary"
                  style="height:44px; margin-bottom: 10px"
                  @click="position(item.id)"
                  :long="true">{{ item.name }}</Button>
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
    <div v-if="sectionList.length > 0" ref="bottomBox" class="bottom-box">
      <Row type="flex" justify="center">

        <Col :xs="22" :sm="22" :md="22" :lg="20">

          <div v-for="(item, index) in categoryList" :key="'se' + index">

            <div :id="item.id" class="category">
              <span class="category-title">{{ item.name }}</span>
            </div>
            <div class="card-box card-box-center">
              <a-link
                v-for="(item,index) in item.sectionList"
                :key="'card' + index"
                :to="item.onStatus === 1 && item.openUrl !== '' ? item.openUrl : 'javascript:void(0)'"
                :target="item.onStatus === 1 && item.openUrl !== '' ? '_blank' : '_self'">
                <section-box :data="item"></section-box>
              </a-link>
            </div>

          </div>

        </Col>

      </Row>
    </div>
    <div v-if="sectionList.length === 0" ref="bottomBox" class="bottom-box-none">
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
        categoryList: [],
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

      await content.app.$axios.post(api + '/category/getCategoryList').then((res) => {
        if (res.status === 200) {
          const da = res.data
          if (da.code === 200) {
            data.categoryList = da.data
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

      data.categoryList.forEach(category => {
        category.sectionList = []
        data.sectionList.forEach(section => {
          if (category.id === section.categoryId) {
            category.sectionList.push(section)
          }
        })
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
        this.$nextTick(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          const offsetTop = this.$refs.bottomBox.offsetTop
          this.showSmallTop = scrollTop > offsetTop - 90
        })
      },
      position (id) {
        const offsetTop = document.getElementById(id).offsetTop
        window.scrollTo(0, offsetTop + 180)
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
  /deep/ .ivu-drawer-body {
    padding: 16px 22px;
  }
  .category-count {
    width: 100%;
    color: #222222;
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    margin: 10px 0 20px;
  }
  .top-small-box {
    position: fixed;
    top: 0;
    width: 100%;
    height: 72px;
    background-color: #409EFF;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
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
      font-size: 20px;
      font-weight: 500;
    }
  }
  .top-box {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #409EFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
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
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 15px;
    }
    .description {
      width: 80%;
      display: flex;
      justify-content: center;
      p {
        color: #ffffff;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .button-group {
      width: 80%;
    }
    @media all and (min-width: 992px) {
      .button-group-media {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .button {
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }
    @media all and (max-width: 992px) {
      .button-group-media {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .button {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .bottom-box-none {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom-box {
    .category {
      text-align: center;
      margin-top: 36px;
      margin-bottom: 40px;
      .category-title {
        font-weight: 900;
        color: #303133;
        font-size: 20px;
      }
    }
    .card-box {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
    }
  }

  .footer {
    margin-top: 50px;
    height: 150px;
    background-color: #222222;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
</style>
