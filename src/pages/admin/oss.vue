<template>
  <div class="container">
    <admin :name="$options.name" :breadcrumb="breadcrumb">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="150">
        <FormItem label="图片前缀域名" prop="domainName">
          <Input v-model="formValidate.domainName" placeholder="请输入图片前缀域名"></Input>
        </FormItem>
        <FormItem label="endpoint" prop="endpoint">
          <Input v-model="formValidate.endpoint" placeholder="请输入endpoint"></Input>
        </FormItem>
        <FormItem label="accessKeyId" prop="keyId">
          <Input v-model="formValidate.keyId"
                 type="password"
                 :password="true"
                 placeholder="请输入keyId"></Input>
        </FormItem>
        <FormItem label="accessKeySecret" prop="keySecret">
          <Input v-model="formValidate.keySecret"
                 type="password"
                 :password="true"
                 placeholder="请输入keySecret"></Input>
        </FormItem>
        <FormItem label="bucketName" prop="bucketName">
          <Input v-model="formValidate.bucketName" placeholder="请输入bucketName"></Input>
        </FormItem>
        <FormItem label="oss目录路径" prop="catalogue">
          <Input v-model="formValidate.catalogue" placeholder="请输入目录路径"></Input>
        </FormItem>
        <FormItem label="bucket所在的区域" prop="region">
          <Input v-model="formValidate.region" placeholder="请输入bucket所在的区域"></Input>
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
    name: 'oss',
    layout: 'admin',
    middleware: 'userAuth',
    mounted () {
      this.getConfig()
    },
    data () {
      return {
        breadcrumb: [
          { title: '阿里云oss设置' }
        ],
        loading: false,
        submitLoading: false,
        formValidate: {
          domainName: '',
          endpoint: '',
          keyId: '',
          keySecret: '',
          bucketName: '',
          catalogue: '',
          region: ''
        },
        ruleValidate: {
          domainName: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          endpoint: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          keyId: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          keySecret: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          bucketName: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          catalogue: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
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
      getConfig () {
        this.loading = true
        this.$axios.$post('/oss/get').then(res => {
          this.loading = false
          if (res.code === 200) {
            if (res.data !== null) {
              this.formValidate = res.data
            }
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('获取oss配置发生了未知错误')
        })
      },
      saveConfig () {
        this.submitLoading = true
        this.$axios.$post('/oss/save', this.formValidate).then(res => {
          this.submitLoading = false
          if (res.code === 200) {
            this.$Message.success(res.message)
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('保存oss配置发生了未知错误')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
