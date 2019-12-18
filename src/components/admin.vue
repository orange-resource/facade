<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name="name">
          <div class="layout-logo">
            <Avatar src="/favicon.ico" />
            <span class="title">橘子软件</span>
          </div>
          <div class="layout-nav">
            <MenuItem name="buttonGroup2" to="/admin/buttonGroup2">
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
        <Card class="animated jackInTheBox" :style="{margin: '20px 0'}">
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
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .title {
    color: #ffffff;
    font-weight: 600;
    margin-left: 10px;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    display: flex;
    align-items: center;
  }
  .layout-nav{
    width: 800px;
    margin: 0 auto;
    margin-right: 20px;
    user-select: none;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
