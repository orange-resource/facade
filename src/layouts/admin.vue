<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <avataaars style="height: 50px"></avataaars>
          </div>
          <div class="layout-nav">
            <MenuItem name="4" to="/admin/system">
              <Icon type="ios-construct" />
              系统设置
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Card :style="{margin: '20px 0'}">
          <div style="min-height: 200px;">
            <nuxt/>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2019 &copy; orange</Footer>
    </Layout>
  </div>
</template>

<style lang="scss">
  body {
    background-color: #f8f8f9;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
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
