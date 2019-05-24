<template>
  <Card>
    <Form ref="form" :model="form" :label-width="95">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="学院">
        <AlterBox title="学院" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.college}}</b>
          </template>
          <template slot="edit">
            <Select style="width:200px" @on-change="handleCollege" label-in-value>
              <Option
                v-for="item in collegeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="班级">
        <AlterBox title="班级" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.class}}</b>
          </template>
          <template slot="edit">
            <Input v-model="form.class" placeholder="班级..." number :maxlength="3"></Input>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="学号">
        <AlterBox title="学号" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{data.snum}}</b>
          </template>
          <template slot="edit">
            <Input v-model="form.snum" placeholder="学号..." number :maxlength="3"></Input>
          </template>
        </AlterBox>
      </FormItem>
      <FormItem label="公寓/宿舍">
        <AlterBox title="公寓/宿舍" @on-cancel="handleCancel" @on-complate="handleUpdate">
          <template slot="notEdit">
            <b>{{apartmentName}}</b>
          </template>
          <template slot="edit">
            <Cascader :data="apartmentData" filterable @on-change="handleApartmentNum"></Cascader>
          </template>
        </AlterBox>
      </FormItem>
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
import PicList from "@/components/pic-list";
import * as student_api from "@/api/student";
import * as apartment_api from "@/api/apartment";
export default {
  name: "student_detail",
  components: {
    AlterBox,
    PicList
  },
  created() {
    this.getInfo(this.$route.params.id);
  },
  mounted() {
    this.handleApartment();
  },
  data() {
    return {
      data: {},
      form: {},
      collegeList: [
        {
          value: "SOAS",
          label: "大气科学学院"
        },
        {
          value: "SORE",
          label: "资源环境学院"
        },
        {
          value: "IOCS",
          label: "网络空间安全学院"
        },
        {
          value: "SOSE",
          label: "软件工程学院"
        },
        {
          value: "SOCS",
          label: "计算机学院"
        },
        {
          value: "COOT",
          label: "光电技术学院"
        }
      ],
      apartmentData: [],
      apartmentName: "",
      apartmentList: [],
      actionUrl: "http://localhost:3000/admin/file/uploadImg",
      defaultList: [],
      extraData: {
        type: "student"
      }
    };
  },
  methods: {
    handleClose() {
      this.$router.push({ path: "/student/index" });
    },
    uploadSuccess(data) {
      if (data && data.length > 0) {
        this.form.avatar = data[0].url;
      }
    },
    handleCollege(code) {
      this.form.college = code.label;
    },
    handleApartmentNum(code) {
      this.form.aid = code[0];
      this.form.dnum = code[1];
    },
    setApartmentName(list) {
      let _filter = list.filter(item => item.id === this.form.aid);
      if (_filter.length === 1) {
        this.apartmentName = `${_filter[0].name}/${this.form.dnum}`;
      } else {
        this.apartmentName = "暂无所属公寓";
      }
    },
    async handleApartment() {
      try {
        const { list } = (await apartment_api.list({
          page: 1,
          size: 100,
          name: null
        })).data;
        this.setApartmentName(list);
        this.apartmentList = list;
        this.apartmentData = list.map(item => {
          const { id, name, floor, roomNum } = item,
            children = [];
          for (let i = 1; i <= floor; i++) {
            for (let j = 1; j <= roomNum; j++) {
              children.push({
                value: `${i}${j < 10 ? "0" + j : j}`,
                label: `${i}${j < 10 ? "0" + j : j}`
              });
            }
          }
          return {
            value: id,
            label: name,
            children
          };
        });
      } catch (error) {}
    },
    handleCancel() {
      this.form = JSON.parse(JSON.stringify(this.data));
      this.$Message.info("取消操作");
    },
    async handleUpdate() {
      try {
        await student_api.update(this.form);
        this.$Message.info("更新成功！");
        this.getInfo(this.$route.params.id);
        this.setApartmentName(this.apartmentList);
      } catch (error) {}
    },
    async getInfo(id) {
      try {
        const { data } = (await student_api.single(id)).data;
        this.data = data;
        this.form = JSON.parse(JSON.stringify(data));
      } catch (error) {}
    }
  }
};
</script>
