<template>
  <Card>
    <Form ref="form" :model="form" :label-width="95">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="姓名">
        <AlterBox title="姓名" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.name}}</b>
          </template>
          <template slot="edit">
            <Input v-model="form.name" placeholder="姓名..."></Input>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="头像">
        <AlterBox title="头像" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <Alert show-icon>图片上传说明：上次格式:['jpg','jpeg','png']；单次上传大小：2048kb</Alert>
            <Avatar :src="data.avatar" size="large"/>
          </template>
          <template slot="edit">
            <PicList
              :defaultList="defaultList"
              @success="uploadSuccess"
              :actionURL="actionUrl"
              :extraData="extraData"
            ></PicList>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="电话">
        <AlterBox title="电话" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.tel}}</b>
          </template>
          <template slot="edit">
            <Input v-model="form.tel" placeholder="电话..."></Input>
          </template>
        </AlterBox>
      </FormItem>
      <Divider orientation="left">操作</Divider>
      <div style="text-align:right">
        <Button @click="handleClose" type="info">返回</Button>
      </div>
    </Form>
  </Card>
</template>
<script>
import AlterBox from "_c/alter-box";
import PicList from "_c/pic-list";
import * as admin_api from "@/api/admin";
export default {
  name: "admin_detail",
  components: {
    AlterBox,
    PicList
  },
  created() {
    this.getInfo(this.$route.params.id);
  },
  data() {
    return {
      data: {},
      form: {},
      actionUrl: "http://localhost:3000/admin/file/uploadImg",
      defaultList: [],
      extraData: {
        type: "admin"
      }
    };
  },
  methods: {
    handleClose() {
      this.$router.push({ path: "/admin/index" });
    },
    uploadSuccess(data) {
      if (data && data.length > 0) {
        this.form.avatar = data[0].url;
      }
    },
    handleCancel() {
      this.form = JSON.parse(JSON.stringify(this.data));
      this.$Message.info("取消操作");
    },
    async handleUpdate() {
      try {
        await admin_api.update(this.form);
        this.$Message.info("更新成功！");
        this.getInfo(this.$route.params.id);
      } catch (error) {}
    },
    async getInfo(id) {
      try {
        const { data } = (await admin_api.single(id)).data;
        this.data = data;
        this.form = JSON.parse(JSON.stringify(data));
      } catch (error) {}
    }
  }
};
</script>
