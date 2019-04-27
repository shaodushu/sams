<template>
  <Card>
    <Form ref="form" :model="form" :label-width="95">
      <FormItem label>
        <AlterBox title @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit"></template>
          <template slot="edit"></template>
        </AlterBox>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import AlterBox from "_c/alter-box";
import * as maintain_api from "@/api/maintain";
export default {
  name: "log_detail",
  components: {
    AlterBox
  },
  created() {
    this.getInfo(this.$route.params.id);
  },
  data() {
    return {
      data: {},
      form: {}
    };
  },
  methods: {
    handleCancel() {
      this.form = JSON.parse(JSON.stringify(this.data));
      this.$Message.info("取消操作");
    },
    async handleUpdate() {
      try {
        await maintain_api.update(this.form);
        this.$Message.info("更新成功！");
        this.getInfo(this.$route.params.id);
      } catch (error) {}
    },
    async getInfo(id) {
      try {
        const { data } = (await maintain_api.single(id)).data;
        this.data = data;
        this.form = JSON.parse(JSON.stringify(data));
      } catch (error) {}
    }
  }
};
</script>
