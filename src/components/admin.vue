<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name="name">
          <div class="layout-logo">
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
          </div>
          <div class="layout-nav">
            <MenuItem name="system" to="/admin/system">
              <Icon type="ios-construct" />
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
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
    user-select: none;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
