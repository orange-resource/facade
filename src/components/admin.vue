<template>
  <div class="layout">
    <Layout>
      <Header class="header">
        <div class="layout-logo">
          <Avatar src="/favicon.png" />
          <span class="title">橘子软件</span>
        </div>
        <Menu mode="horizontal" theme="dark" :active-name="name">
          <div class="layout-nav">
            <MenuItem name="sectionPage" to="/admin/section">
              <Icon type="md-list-box" />
              版块设置
            </MenuItem>
            <MenuItem name="buttonGroup" to="/admin/buttonGroup">
              <Icon type="md-grid" />
              按钮组设置
            </MenuItem>
            <MenuItem name="oss" to="/admin/oss">
              <Icon type="md-cloud-upload" />
              图片上传设置
            </MenuItem>
            <MenuItem name="system" to="/admin/system">
              <Icon type="ios-settings" />
              系统设置
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Card class="card animated bounceInLeft"
              :padding="20"
              :shadow="true"
              :style="{margin: '20px 0'}">
          <div style="min-height: 200px;">
            <Breadcrumb style="margin-bottom: 20px">
              <BreadcrumbItem v-for="(item,index) in breadcrumb" :key="'breadcrumb' + index" :to="item.to">
                {{ item.title }}
              </BreadcrumbItem>
            </Breadcrumb>

            <slot></slot>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2019 &copy; orange 开源地址 https://gitee.com/orange-resource/facade</Footer>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "admin",
    props: {
      breadcrumb: {
        type: Array
      },
      name: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    position: relative;
    overflow: hidden;
  }
  .title {
    color: #f6ca9d;
    font-weight: 600;
    margin-left: 10px;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #17233d;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }
  .layout-nav {
    margin-left: 20px;
    user-select: none;
  }
  .layout-footer-center {
    text-align: center;
    background-color: #f8f8f9;
    font-weight: 600;
    color: #808695;
  }
  /deep/ .ivu-layout {
    background-color: #f8f8f9;
  }
  /deep/ .ivu-menu {
    background-color: #17233d;
  }
</style>
