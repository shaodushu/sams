<template>
  <Card>
    <Form :model="formItem" :label-width="80">
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
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { create } from '@/api/admin';
import PicList from '@/components/pic-list'
export default {
  name: 'admin_create',
  data() {
    return {
      actionUrl: "http://localhost:3000/admin/uploadImg",
      defaultList: [],
      formItem: {
        name: '',
        avatar: '',
        tel: ''
      },
      extraData: {
        type: 'admin'
      }
    }
  },
  components: {
    PicList
  },
  methods: {
    async handleClick() {
      try {
        const result = await create(this.formItem)
        this.$Message.info(result.data.msg)
      } catch (error) {
        console.log(error)
      }
    },
    handleSuccess(data) {
      if (data && data.length > 0) {
        this.formItem.avatar = data[0].url
      }
    }
  }
}
</script>
