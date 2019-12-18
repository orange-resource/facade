<template>
  <div>
    <admin :name="$options.name" :breadcrumb="breadcrumb">
      <ButtonGroup>
        <Button type="primary" @click="createShowDrawer()">
          <Icon type="md-add-circle" />
          新增版块
        </Button>
      </ButtonGroup>
      <Table :loading="loading" border :columns="columns" :data="data" :stripe="true" style="margin-top: 10px">
        <template slot-scope="{ row }" slot="icon">
          <Icon :type="row.icon" size="50" />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateShowDrawer(row)">编辑</Button>
          <Button type="error" size="small" @click="deleteSection(row.id)">删除</Button>
        </template>
      </Table>
    </admin>

    <Drawer
      :title="isAddData === true ? '新增数据' : '编辑数据'"
      v-model="modal"
      width="720"
      :styles="styles"
    >

      <Form
            style="margin-bottom: 60px"
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="150">
        <FormItem label="版块主图" prop="mainPicture">
          <upload-img :limit="1" :urlList="urlList" @on-success="uploadSuccess"></upload-img>
        </FormItem>
        <FormItem label="版块名称" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入版块名称"></Input>
        </FormItem>
        <FormItem label="版块描述" prop="description">
          <Input v-model="formValidate.description"
                 type="textarea"
                 show-word-limit
                 maxlength="500"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="输入点击跳转链接..."></Input>
        </FormItem>
        <FormItem label="排序" prop="sort">
          <InputNumber :max="1000" :min="1" v-model="formValidate.sort"></InputNumber>
        </FormItem>
        <FormItem label="点击跳转链接" prop="openUrl">
          <Input v-model="formValidate.openUrl"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="输入点击跳转链接..."></Input>
        </FormItem>
      </Form>

      <div class="drawer-footer">
        <Button type="primary"
                :loading="submitLoading"
                @click="handleSubmit('formValidate')">
          提交
        </Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重新填写</Button>
      </div>

    </Drawer>
  </div>
</template>

<script>
  import clone from '~/assets/util/clone'

  export default {
    name: "section",
    middleware: 'userAuth',
    mounted () {
      this.getSectionList()
    },
    data () {
      return {
        breadcrumb: [
          { title: '版块设置' }
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        urlList: [],
        modal: false,
        loading: false,
        submitLoading: false,
        isAddData: true,
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 100,
            align: 'center'
          },
          {
            title: '按钮显示文本',
            key: 'text',
            align: 'center',
            width: '400'
          },
          {
            title: '按钮图标',
            slot: 'icon',
            key: 'icon',
            align: 'center',
            width: '100'
          },
          {
            title: '排序',
            key: 'sort',
            align: 'center',
            width: '100'
          },
          {
            title: '打开链接',
            key: 'openUrl',
            align: 'center',
            width: '500'
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center'
          }
        ],
        data: [],
        formValidate: this.getData(),
        ruleValidate: {
          text: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          openUrl: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          sort: [
            { required: true, type:'number', message: '请输入', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getData () {
        return {
          mainPicture: '',
          text: '',
          icon: '',
          openUrl: '',
          sort: 1
        }
      },
      uploadSuccess (url) {
        this.formValidate.logoUrl = url
      },
      handleSubmit (name) {
        if (this.urlList.length === 0) {
          this.formValidate.logoUrl = ''
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.isAddData) {
              this.createSection()
            } else {
              this.updateSection()
            }
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getSectionList () {
        this.loading = true
        this.$axios.$post('/section/getList').then((res) => {
          this.loading = false
          if (res.code === 3) {
            this.data = res.data
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('获取版块数据发生了未知错误')
        })
      },
      createShowDrawer () {
        this.isAddData = true
        this.formValidate = this.getData()
        this.modal = true
      },
      createSection () {
        this.submitLoading = true
        this.$axios.$post('/section/create', this.formValidate).then((res) => {
          this.submitLoading = false
          if (res.code === 1) {
            this.$Message.success(res.message)
            this.getButtonGroupList()
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('新增版块发生了未知错误')
        })
      },
      updateShowDrawer (row) {
        this.isAddData = false
        this.$refs['formValidate'].resetFields()
        this.formValidate = clone.deep(row)
        this.modal = true
      },
      updateSection () {
        this.submitLoading = true
        this.$axios.$post('/section/update', this.formValidate).then((res) => {
          this.submitLoading = false
          if (res.code === 1) {
            this.$Message.success(res.message)
            this.getButtonGroupList()
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('编辑版块发生了未知错误')
        })
      },
      deleteSection (id) {
        this.$axios.$post('/section/delete', {
          id: id
        }).then((res) => {
          if (res.code === 1) {
            this.$Message.success(res.message)
            this.getButtonGroupList()
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.$Message.error('删除版块发生了未知错误')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
