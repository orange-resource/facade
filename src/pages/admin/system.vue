<template>
  <div>
    <BreadcrumbItem>系统设置</BreadcrumbItem>

    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          style="margin-top: 10px"
          :label-width="80">
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
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重新填写</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'system',
    layout: 'admin',
    data () {
      return {
        formValidate: {
          title: '',
          desc: ''
        },
        ruleValidate: {
          title: [
            { required: true, message: '请输入网站标题才能提交哟', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入网站描述才能提交哟', trigger: 'blur' },
            { type: 'string', min: 1, message: '网站描述字符数最少为1哟', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
