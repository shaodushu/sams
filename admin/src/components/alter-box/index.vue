<template>
    <div class="alter-box">
        <Row type="flex" justify="space-between" align="middle">
            <Col span="17">
                <slot name="notEdit"></slot>
            </Col>
            <Col span="3" v-if="!disable">
                <Button type="dashed" @click="handleChangeShow">修改</Button>
            </Col>
        </Row>
        <Modal
            :title="title"
            :width="modalWidth"
            v-model="isShow"
            @on-ok="handleOk"
            @on-cancel="handleCancel">
            <slot name="edit"></slot>
        </Modal>
    </div>
</template>
<script>

export default {
  name: 'alter-box',
  data () {
    return {
      isShow: false
    }
  },
  props: {
    title: String,
    modalWidth: [Number, String],
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChangeShow () {
      this.isShow = true
    },
    handleOk () {
      this.$emit('on-complate')
    },
    handleCancel () {
      this.$emit('on-cancel')
    }
  }
}
</script>
