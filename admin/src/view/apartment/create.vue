<template>
  <Card>
    <Form :model="formItem" :label-width="80">
      <FormItem label="公寓名">
        <Input v-model="formItem.name" placeholder="公寓名..."></Input>
      </FormItem>
      <FormItem label="类型">
        <RadioGroup v-model="formItem.type">
          <Radio :label="1">男生</Radio>
          <Radio :label="2">女生</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="楼层">
        <InputNumber :max="10" :min="1" v-model="formItem.floor"></InputNumber>
      </FormItem>
      <FormItem label="每层房间数">
        <InputNumber :max="10" :min="1" v-model="formItem.roomNum"></InputNumber>
      </FormItem>
      <FormItem label="规则">
        <Input
          v-model="formItem.rule"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="规则..."
        ></Input>
      </FormItem>
      <FormItem label="通知">
        <Input
          v-model="formItem.notice"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="通知..."
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleClick">提交</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { create } from '@/api/apartment';
export default {
  name: 'apartment_create',
  data() {
    return {
      formItem: {
        name: '',
        type: 1,
        floor: 0,
        roomNum: 0,
        rule: '',
        notice: ''
      }
    }
  },
  methods: {
    async handleClick() {
      try {
        const result = await create(this.formItem)
        this.$Message.info(result.data.msg)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
