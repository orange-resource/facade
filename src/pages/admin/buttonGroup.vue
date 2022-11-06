<template>
  <div>
    <admin :name="$options.name" :breadcrumb="breadcrumb">
      <ButtonGroup>
        <Button type="primary" @click="createShowDrawer()">
          <Icon type="md-add-circle" />
          新增按钮
        </Button>
      </ButtonGroup>
      <Table :loading="loading" border :columns="columns" :data="data" :stripe="true" style="margin-top: 10px">
        <template slot-scope="{ row }" slot="icon">
          <Icon :type="row.icon" size="50" />
        </template>
        <template slot-scope="{ row }" slot="showStatus">
          <Tag v-if="row.showStatus === 1" checkable color="success">显示</Tag>
          <Tag v-else checkable color="error">不显示</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateShowDrawer(row)">编辑</Button>
          <Button type="error" size="small" @click="deleteButton(row.id)">删除</Button>
        </template>
      </Table>
    </admin>

    <Drawer
      :title="isAddData === true ? '新增数据' : '编辑数据'"
      v-model="modal"
      width="720"
      :mask-closable="false"
      :styles="styles"
    >

      <Form ref="formValidate"
            :model="formValidate"
            :show-message="false"
            :label-width="150">
        <FormItem label="按钮显示文本" :required="true">
          <Input v-model="formValidate.text" placeholder="输入按钮显示文本"></Input>
        </FormItem>
        <FormItem label="按钮icon" :required="true">
          <Row>
            <Col span="18">
              <Input v-model="formValidate.icon" placeholder="输入按钮icon"></Input>
            </Col>
            <Col span="4" offset="1">
              <Icon :type="formValidate.icon" size="50" />
            </Col>
          </Row>
        </FormItem>
        <FormItem label="排序" :required="true">
          <InputNumber :max="1000" :min="1" v-model="formValidate.sort"></InputNumber>
        </FormItem>
        <FormItem label="版块显示状态">
          <i-switch v-model="formValidate.showStatusBool"
                    @on-change="showStatusChange"
                    size="large">
            <span slot="open">显示</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="按钮点击跳转链接" :required="true">
          <Input v-model="formValidate.openUrl"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="输入按钮点击跳转链接..."></Input>
        </FormItem>
      </Form>

      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="modal = false">取消</Button>
        <Button type="primary"
                :loading="submitLoading"
                @click="handleSubmit()">
          提交
        </Button>
      </div>

    </Drawer>
  </div>
</template>

<script>
  import clone from '~/assets/util/clone'

  export default {
    name: "buttonGroup",
    middleware: 'userAuth',
    layout: 'admin',
    mounted () {
      this.getButtonGroupList()
    },
    data () {
      return {
        breadcrumb: [
          { title: '按钮组设置' }
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
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
          },
          {
            title: '显示状态',
            key: 'showStatus',
            slot: 'showStatus',
            align: 'center',
          },
          {
            title: '打开链接',
            key: 'openUrl',
            align: 'center',
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center'
          }
        ],
        data: [],
        formValidate: this.getData(),
      }
    },
    methods: {
      getData () {
        return {
          text: '',
          icon: '',
          openUrl: '',
          sort: 1,
          showStatus: 1,
          showStatusBool: true
        }
      },
      showStatusChange (bool) {
        if (bool) {
          this.formValidate.showStatus = 1
        } else {
          this.formValidate.showStatus = 2
        }
      },
      handleSubmit () {
        if (this.formValidate.text === '') {
          this.$Message.info('请填写按钮文本')
          return
        }
        if (this.formValidate.icon === '') {
          this.$Message.info('请填写按钮图标')
          return
        }
        if (this.formValidate.openUrl === '') {
          this.$Message.info('请填写跳转链接')
          return
        }

        if (this.isAddData) {
          this.createButton()
        } else {
          this.updateButton()
        }
      },
      getButtonGroupList () {
        this.loading = true
        this.$axios.$post('/buttonGroup/getList').then((res) => {
          this.loading = false
          if (res.code === 200) {
            for (let i = 0, arr = res.data; i < arr.length; i++) {
              arr[i].showStatusBool = arr[i].showStatus === 1
            }
            this.data = res.data
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('获取按钮组数据发生了未知错误')
        })
      },
      createShowDrawer () {
        this.isAddData = true
        this.formValidate = this.getData()
        this.modal = true
      },
      createButton () {
        this.submitLoading = true
        this.$axios.$post('/buttonGroup/create', this.formValidate).then((res) => {
          this.submitLoading = false
          if (res.code === 200) {
            this.$Message.success(res.message)
            this.getButtonGroupList()
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('新增按钮发生了未知错误')
        })
      },
      updateShowDrawer (row) {
        this.isAddData = false
        this.$refs['formValidate'].resetFields()
        this.formValidate = clone.deep(row)
        this.modal = true
      },
      updateButton () {
        this.submitLoading = true
        this.$axios.$post('/buttonGroup/update', this.formValidate).then((res) => {
          this.submitLoading = false
          if (res.code === 200) {
            this.$Message.success(res.message)
            this.getButtonGroupList()
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('编辑按钮发生了未知错误')
        })
      },
      deleteButton (id) {
        this.$Modal.confirm({
          title: '删除提示',
          content: '<p>确认删除此条数据?</p>',
          onOk: () => {
            this.$axios.$post('/buttonGroup/delete', {
              id: id
            }).then((res) => {
              if (res.code === 200) {
                this.$Message.success(res.message)
                this.getButtonGroupList()
              } else {
                this.$Message.info(res.message)
              }
            }).catch(() => {
              this.$Message.error('删除按钮发生了未知错误')
            })
          },
          onCancel: () => {
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
