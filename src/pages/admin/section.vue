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
        <template slot-scope="{ row }" slot="mainPicture">
          <div style="margin: 10px">
            <img class="openImage" v-lazy="row.mainPicture" height="100px" width="100%">
          </div>
        </template>
        <template slot-scope="{ row }" slot="showStatus">
          {{ row.showStatus === 1 ? '显示' : '不显示' }}
        </template>
        <template slot-scope="{ row }" slot="onStatus">
          {{ row.onStatus === 1 ? '开启访问' : '关闭访问' }}
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
      :mask-closable="false"
      :styles="styles"
    >

      <Form
            style="margin-bottom: 60px"
            ref="formValidate"
            :model="formValidate"
            :show-message="false"
            :label-width="150">
        <FormItem label="版块主图" :required="true">
          <upload-img :limit="1" :urlList="formValidate.urlList" @on-success="uploadSuccess"></upload-img>
        </FormItem>
        <FormItem label="版块名称" :required="true">
          <Input v-model="formValidate.name" placeholder="请输入版块名称"></Input>
        </FormItem>
        <FormItem label="版块描述" :required="true">
          <Input v-model="formValidate.description"
                 type="textarea"
                 show-word-limit
                 maxlength="500"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="输入点击跳转链接..."></Input>
        </FormItem>
        <FormItem label="版块显示状态">
          <i-switch v-model="formValidate.showStatusBool"
                    @on-change="showStatusChange"
                    size="large">
            <span slot="open">显示</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="排序">
          <InputNumber :max="1000" :min="1" v-model="formValidate.sort"></InputNumber>
        </FormItem>
        <FormItem label="点击跳转链接" :required="true">
          <Input v-model="formValidate.openUrl"
                 type="textarea"
                 :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="输入点击跳转链接..."></Input>
        </FormItem>
        <FormItem label="版块访问状态">
          <i-switch v-model="formValidate.onStatusBool"
                    @on-change="onStatusChange"
                    size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem v-if="formValidate.onStatusBool === false"
                  :required="true"
                  label="不可访问时候的文本">
          <Input v-model="formValidate.offText" placeholder="请输入不可访问时候的文本展示"></Input>
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
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'viewerjs'
  import SectionTableExpand from "./table/sectionTableExpand";

  export default {
    name: "sectionPage",
    components: { SectionTableExpand },
    layout: 'admin',
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
        modal: false,
        loading: false,
        submitLoading: false,
        isAddData: true,
        columns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(SectionTableExpand, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '序号',
            type: 'index',
            width: 100,
            align: 'center'
          },
          {
            title: '主图',
            key: 'mainPicture',
            slot: 'mainPicture',
            align: 'center',
            width: '200'
          },
          {
            title: '版块名称',
            key: 'name',
            align: 'center',
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
            title: '访问状态',
            key: 'onStatus',
            slot: 'onStatus',
            align: 'center',
          },
          {
            title: '关闭访问显示文本',
            key: 'offText',
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
          urlList: [],
          mainPicture: '',
          name: '',
          description: '',
          showStatus: 1,
          showStatusBool: true,
          sort: 1,
          openUrl: '',
          onStatus: 1,
          onStatusBool: true,
          offText: ''
        }
      },
      uploadSuccess (url) {
        this.formValidate.mainPicture = url
      },
      handleSubmit () {
        if (this.formValidate.urlList.length === 0) {
          this.$Message.info('请上传主图')
          return
        }
        if (this.formValidate.name === '') {
          this.$Message.info('请填写版块名称')
          return
        }
        if (this.formValidate.description === '') {
          this.$Message.info('请填写版块描述')
          return
        }
        if (this.formValidate.openUrl === '') {
          this.$Message.info('请填写跳转链接')
          return
        }

        if (this.isAddData) {
          this.createSection()
        } else {
          this.updateSection()
        }
      },
      showStatusChange (bool) {
        if (bool) {
          this.formValidate.showStatus = 1
        } else {
          this.formValidate.showStatus = 2
        }
      },
      onStatusChange (bool) {
        if (bool) {
          this.formValidate.onStatus = 1
        } else {
          this.formValidate.onStatus = 2
        }
      },
      openImage () {
        this.$nextTick(function () {
          let openImageClass = document.getElementsByClassName('openImage')

          for (let i = 0; i < openImageClass.length; i++) {
            let e = new Viewer(openImageClass[i], {
              inline: false,
              navbar: false,
              toolbar: false,
              zIndex: 999999
            })
            e.full()
          }
        })
      },
      getSectionList () {
        this.loading = true
        this.$axios.$post('/section/getList').then((res) => {
          this.loading = false
          if (res.code === 200) {
            for (let i = 0, arr = res.data; i < arr.length; i++) {
              arr[i].showStatusBool = arr[i].showStatus === 1
              arr[i].onStatusBool = arr[i].onStatus === 1
              arr[i].urlList = []
              arr[i].urlList.push(arr[i].mainPicture)
            }
            this.data = res.data
            this.openImage()
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
          if (res.code === 200) {
            this.$Message.success(res.message)
            this.getSectionList()
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
          if (res.code === 200) {
            this.$Message.success(res.message)
            this.getSectionList()
          } else {
            this.$Message.info(res.message)
          }
        }).catch(() => {
          this.submitLoading = false
          this.$Message.error('编辑版块发生了未知错误')
        })
      },
      deleteSection (id) {
        this.$Modal.confirm({
          title: '删除提示',
          content: '<p>确认删除此条数据?</p>',
          onOk: () => {
            this.$axios.$post('/section/delete', {
              id: id
            }).then((res) => {
              if (res.code === 200) {
                this.$Message.success(res.message)
                this.getSectionList()
              } else {
                this.$Message.info(res.message)
              }
            }).catch(() => {
              this.$Message.error('删除版块发生了未知错误')
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
  .openImage {
    cursor: pointer
  }
</style>
