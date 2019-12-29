<template>
  <div class="container">
    <admin :name="$options.name" :breadcrumb="breadcrumb">
      <Form ref="formValidate"
            :model="formValidate"
            :show-message="false"
            :label-width="150">
        <FormItem label="网站logo" :required="true">
          <upload-img :limit="1" :urlList="urlList" @on-success="uploadSuccess"></upload-img>
        </FormItem>
        <FormItem label="网站标题" :required="true">
          <Input v-model="formValidate.title" placeholder="请输入您的网站标题"></Input>
        </FormItem>
        <FormItem label="网站描述" :required="true">
          <Input v-model="formValidate.desc"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 show-word-limit
                 maxlength="250"
                 placeholder="输入您的网站描述..."></Input>
        </FormItem>
        <FormItem label="网站底部信息" :required="true">
          <Input v-model="formValidate.footerInfo" placeholder="请输入您的网站底部信息"></Input>
        </FormItem>
        <FormItem label="主页面中标题" :required="true">
          <Input v-model="formValidate.pageMainTitle" placeholder="请输入主页面中标题"></Input>
        </FormItem>
        <FormItem label="主页面中简短描述" :required="true">
          <Input v-model="formValidate.pageMainDescription" placeholder="请输入主页面中简短描述"></Input>
        </FormItem>
        <FormItem label="主页面中一开始即弹框" :required="true">
          <i-switch v-model="formValidate.showPopStatusBool"
                    @on-change="showPopStatusChange"
                    size="large">
            <span slot="open">显示</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem v-if="formValidate.showPopStatus === 1" label="弹框图片" :required="true">
          <upload-img :limit="1" :urlList="popUrlList" @on-success="popUploadSuccess"></upload-img>
        </FormItem>
        <FormItem v-if="formValidate.showPopStatus === 1" label="弹框点击跳转链接">
          <Input v-model="formValidate.popOpenUrl"
                 type="textarea"
                 :autosize="{minRows: 2, maxRows: 5}"
                 placeholder="请输入点击弹框跳转链接..."></Input>
          <span class="prompt-text">
            如果没有弹框跳转链接不要填就行了
          </span>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  :loading="submitLoading"
                  @click="handleSubmit('formValidate')">
            提交
          </Button>
        </FormItem>
      </Form>
    </admin>
  </div>
</template>

<script>
  export default {
    name: 'system',
    layout: 'admin',
    middleware: 'userAuth',
    mounted () {
      this.getConfig()
    },
    data () {
      return {
        breadcrumb: [
          { title: '系统设置' }
        ],
        urlList: [],
        popUrlList: [],
        loading: false,
        submitLoading: false,
        formValidate: {
          logoUrl: '',
          title: '',
          desc: '',
          footerInfo: '',
          pageMainTitle: '',
          pageMainDescription: '',
          showPopStatus: 2,
          showPopStatusBool: false,
          popImageUrl: '',
          popOpenUrl: ''
        }
      }
    },
    methods: {
      showPopStatusChange (bool) {
        if (bool) {
          this.formValidate.showPopStatus = 1
        } else {
          this.formValidate.showPopStatus = 2
        }
      },
      uploadSuccess (url) {
        this.formValidate.logoUrl = url
      },
      popUploadSuccess (url) {
        this.formValidate.popImageUrl = url
      },
      handleSubmit (name) {
        if (this.urlList.length === 0) {
          this.$Message.info('请上传网站logo')
          return
        }
        if (this.formValidate.title === '') {
          this.$Message.info('请填写网站标题')
          return
        }
        if (this.formValidate.desc === '') {
          this.$Message.info('请填写网站描述')
          return
        }
        if (this.formValidate.footerInfo === '') {
          this.$Message.info('请填写网站底部信息')
          return
        }
        if (this.formValidate.pageMainTitle === '') {
          this.$Message.info('请填写主页面中标题')
          return
        }
        if (this.formValidate.pageMainDescription === '') {
          this.$Message.info('请填写主页面中简短描述')
          return
        }
        if (this.formValidate.showPopStatus === 1) {
          if (this.popUrlList.length === 0) {
            this.$Message.info('请上传弹框图片')
            return
          }
        }

        this.saveConfig()
      },
      getConfig () {
        this.loading = true
        this.$axios.$post('/system/config/get').then(res => {
          this.loading = false
          if (res.code === 200) {
            if (res.data !== null) {
              this.formValidate = res.data
              this.formValidate.desc = res.data.description
              this.formValidate.showPopStatusBool = res.data.showPopStatus === 1
              this.urlList.push(res.data.logoUrl)
              this.popUrlList.push(res.data.popImageUrl)
            }
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('获取系统配置发生了未知错误')
        })
      },
      saveConfig () {
        this.submitLoading = true
        this.$axios.$post('/system/config/save', this.formValidate).then(res => {
          this.submitLoading = false
          if (res.code === 200) {
            this.$Message.success(res.message)
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('保存系统配置发生了未知错误')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
