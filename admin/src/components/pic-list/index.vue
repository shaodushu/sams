<template>
  <div>
    <div
      class="demo-upload-list"
      v-for="(item,index) in uploadList"
      :key="index"
      v-show="uploadList.length<=1"
    >
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      v-show="uploadList.length<1"
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :default-file-list="defaultList"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      :data="extraData"
      type="drag"
      :action="actionURL"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"/>
      </div>
    </Upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadList: [],
      file: null
    };
  },
  watch: {
    defaultList(val) {
      this.$refs.upload.fileList = val;
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList;
      });
    },
  },
  props: {
    actionURL: {
      type: String,
      default: ''
    },
    extraData: {
      type: Object,
      default() {
        return {}
      }
    },
    defaultList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
  },
  methods: {
    handleSuccess(res, file) {
      if (res.status === 1) {
        file.url = res.url;
        this.$Message.success(res.msg);
        this.$emit("success", this.uploadList);
      } else this.$Message.warning(res.msg);
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件： " + file.name + " 格式不正确,请上传['jpg','jpeg','png']."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出限制",
        desc: "文件：  " + file.name + " 太大, 超出2M限制."
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.uploadList.pop();
        this.$Notice.warning({
          title: "上传图片最大不超过5张."
        });
      }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.$emit("success", this.uploadList);
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
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
  background: rgba(0, 0, 0, 0.6);
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