<template>
  <div>
    <div class="demo-upload-list" v-for="item in urlList">
      <img :src="item">
      <div class="demo-upload-list-cover">
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png', 'ico', 'gif']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="action"
      style="display: inline-block;width:120px;">
      <div style="width: 120px;height:120px;line-height: 120px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>

<script>
  const api = process.env.NODE_ENV === 'development' ?
    process.env.devApi : process.env.proApi
  export default {
    name: 'uploadImg',
    props: {
      limit: {
        type: Number,
        default: -1
      },
      urlList: {
        type: Array
      }
    },
    data () {
      return {
        action: api + '/oss/upload'
      }
    },
    methods: {
      getUrlListIndex () {
        const fileList = this.$refs.upload.fileList;
        let index = -1
        for (let i = 0, arr = fileList; i < arr.length; i++) {
          for (let u = 0, uArr = this.urlList; u < uArr.length; u++) {
            if (arr[i].url === uArr[u]) {
              index = u
            }
          }
        }
      },
      handleRemove (url) {
        this.urlList.splice(this.getUrlListIndex(), 1)
      },
      handleSuccess (res, file) {
        if (res.data !== null) {
          this.urlList.push(res.data)
          this.$Message.success(res.message)
          this.$emit('on-success', res.data)
        }
      },
      handleFormatError (file) {
        const g = ['jpg','jpeg','png', 'ico']
        this.$Message.info('图片上传格式不正确，现只能上传 ' + g.join(' '))
      },
      handleMaxSize (file) {
        this.$Message.info('图片上传大小限制2M哟')
      },
      handleBeforeUpload () {
        if (this.limit === -1) {
          return true
        }
        const check = this.urlList.length >= this.limit;
        if (check) {
          this.$Message.info('图片只能上传' + this.limit + '张哟!!!')
          return false
        }
        return true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .demo-upload-list {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
    padding: 5px;
    cursor: pointer;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
