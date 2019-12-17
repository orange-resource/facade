<template>
  <div class="container">
    <admin :name="$options.name" :breadcrumb="breadcrumb">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="150">
        <FormItem label="网站logo" prop="logoUrl">
          <upload></upload>
        </FormItem>
        <FormItem label="网站标题" prop="title">
          <Input v-model="formValidate.title" placeholder="输入您的网站标题"></Input>
        </FormItem>
        <FormItem label="网站描述" prop="desc">
          <Input v-model="formValidate.desc"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 show-word-limit
                 maxlength="250"
                 placeholder="输入您的网站描述..."></Input>
        </FormItem>
        <FormItem label="网站底部信息" prop="footerInfo">
          <Input v-model="formValidate.footerInfo" placeholder="输入您的网站底部信息"></Input>
        </FormItem>
        <FormItem label="主页面中标题" prop="pageMainTitle">
          <Input v-model="formValidate.pageMainTitle" placeholder="请输入主页面中标题"></Input>
        </FormItem>
        <FormItem label="主页面中简短描述" prop="pageMainDescription">
          <Input v-model="formValidate.pageMainDescription" placeholder="请输入主页面中简短描述"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  :loading="submitLoading"
                  @click="handleSubmit('formValidate')">
            提交
          </Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重新填写</Button>
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
        loading: false,
        submitLoading: false,
        formValidate: {
          title: '',
          desc: '',
          footerInfo: '',
          pageMainTitle: '',
          pageMainDescription: ''
        },
        ruleValidate: {
          title: [
            { required: true, message: '请输入网站标题才能提交哟', trigger: 'blur' }
          ],
          footerInfo: [
            { required: true, message: '请输入网站底部信息才能提交哟', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入网站描述才能提交哟', trigger: 'blur' },
            { type: 'string', min: 1, message: '网站描述字符数最少为1哟', trigger: 'blur' }
          ],
          pageMainTitle: [
            { required: true, message: '请输入主页面中标题才能提交哟', trigger: 'blur' }
          ],
          pageMainDescription: [
            { required: true, message: '请输入主页面中简短描述才能提交哟', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveConfig()
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getConfig () {
        this.loading = true
        this.$axios.$post('/system/config/get').then(res => {
          this.loading = false
          if (res.code === 3) {
            if (res.data !== null) {
              this.formValidate.title = res.data.title
              this.formValidate.desc = res.data.description
              this.formValidate.footerInfo = res.data.footerInfo
              this.formValidate.pageMainTitle = res.data.pageMainTitle
              this.formValidate.pageMainDescription = res.data.pageMainDescription
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
          if (res.code === 1) {
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
