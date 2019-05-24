<template>
  <Card>
    <Form :model="formItem" :label-width="80">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="学院">
        <Select style="width:200px" @on-change="handleCollege" label-in-value>
          <Option v-for="item in collegeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="班级">
        <Input v-model="formItem.class" placeholder="班级..." number :maxlength="3"></Input>
      </FormItem>
      <FormItem label="学号">
        <Input v-model="formItem.snum" placeholder="学号..." number :maxlength="8"></Input>
      </FormItem>
      <FormItem label="公寓/宿舍">
        <Cascader :data="apartmentData" filterable @on-change="handleApartmentNum"></Cascader>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="formItem.name" placeholder="姓名..."></Input>
      </FormItem>
      <FormItem>
        <Alert show-icon>图片上传说明：上次格式:['jpg','jpeg','png']；单次上传大小：2048kb</Alert>
      </FormItem>
      <FormItem label="图片">
        <PicList
          :defaultList="defaultList"
          @success="handleSuccess"
          :actionURL="actionUrl"
          :extraData="extraData"
        ></PicList>
      </FormItem>
      <FormItem label="电话">
        <Input v-model="formItem.tel" placeholder="电话..." number :maxlength="11"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleClick">提交</Button>
        <Button style="margin-left: 8px" @click="handleClose">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import * as student_api from "@/api/student";
import * as apartment_api from "@/api/apartment";
import PicList from "@/components/pic-list";
export default {
  name: "student_create",
  data() {
    return {
      actionUrl: "http://localhost:3000/admin/file/uploadImg",
      defaultList: [],
      formItem: {
        aid: "",
        snum: "",
        dnum: "",
        college: "",
        class: "",
        name: "",
        avatar: "",
        tel: ""
      },
      extraData: {
        type: "student"
      },
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
      apartment_dnum: []
    };
  },
  components: {
    PicList
  },
  mounted() {
    this.handleApartment();
  },
  methods: {
    handleClose() {
      this.$router.push({ path: "/student/index" });
    },
    handleCollege(code) {
      this.formItem.college = code.label;
    },
    handleApartmentNum(code) {
      this.formItem.aid = code[0];
      this.formItem.dnum = code[1];
    },
    async handleApartment() {
      try {
        const { list } = (await apartment_api.list({
          page: 1,
          size: 100,
          name: null
        })).data;
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
    async handleClick() {
      try {
        const result = await student_api.create(this.formItem);
        this.$Message.info(result.data.msg);
      } catch (error) {
        console.log(error);
      }
    },
    handleSuccess(data) {
      if (data && data.length > 0) {
        this.formItem.avatar = data[0].url;
      }
    }
  }
};
</script>
