<template>
  <Card>
    <Form ref="form" :model="form" :label-width="95">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="公寓名">
        <AlterBox title="公寓名" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.name}}</b>
          </template>
          <template slot="edit">
            <Input v-model="form.name" placeholder="公寓名..."></Input>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="类型">
        <AlterBox title="类型" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.type===1?'男生':'女生'}}</b>
          </template>
          <template slot="edit">
            <RadioGroup v-model="form.type">
              <Radio :label="1">男生</Radio>
              <Radio :label="2">女生</Radio>
            </RadioGroup>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="楼层">
        <AlterBox title="楼层" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.floor}}</b>
          </template>
          <template slot="edit">
            <InputNumber :max="10" :min="1" v-model="form.floor"></InputNumber>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="每层房间数">
        <AlterBox title="每层房间数" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.roomNum}}</b>
          </template>
          <template slot="edit">
            <InputNumber :max="10" :min="1" v-model="form.roomNum"></InputNumber>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="规则">
        <AlterBox title="规则" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.rule}}</b>
          </template>
          <template slot="edit">
            <Input
              v-model="form.rule"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="规则..."
            ></Input>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="通知">
        <AlterBox title="通知" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.notice}}</b>
          </template>
          <template slot="edit">
            <Input
              v-model="form.notice"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="通知..."
            ></Input>
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
import * as apartment_api from "@/api/apartment";
export default {
  name: "apartment_detail",
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
    handleClose() {
      this.$router.push({ path: "/apartment/index" });
    },
    handleCancel() {
      this.form = JSON.parse(JSON.stringify(this.data));
      this.$Message.info("取消操作");
    },
    async handleUpdate() {
      try {
        await apartment_api.update(this.form);
        this.$Message.info("更新成功！");
        this.getInfo(this.$route.params.id);
      } catch (error) {}
    },
    async getInfo(id) {
      try {
        const { data } = (await apartment_api.single(id)).data;
        this.data = data;
        this.form = JSON.parse(JSON.stringify(data));
      } catch (error) {}
    }
  }
};
</script>
