<template>
  <Select
    ref="select"
    v-model="model"
    filterable
    remote
    clearable
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    @on-change="handleChange"
    label-in-value
    @on-clear="handleClear"
    :loading="loading"
  >
    <Option
      v-for="(option, index) in options"
      :value="option.value"
      :key="index"
      :label="option.label"
    >
      <span>{{option.label|substr(20)}}</span>
      <span style="float:right;color:#ccc" v-if="option.subtitle">{{option.subtitle|substr(20)}}</span>
    </Option>
  </Select>
</template>
<script>

export default {
  name: 'select-box',
  data() {
    return {
      model: '',
      loading: false,
      options: []
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    substr(str, length) {
      if (str.length <= length) {
        return str
      } else {
        return str.slice(0, length) + '...'
      }

    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    clearSingleSelect() {
      this.$refs.select.clearSingleSelect()
    },
    remoteMethod(query) {
      if (query !== '') {

        this.loading = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.loading = false
            const list = this.list.map(item => {
              return {
                value: item.id,
                label: item.name,
                subtitle: item.type === 1 ? '男生公寓' : '女生公寓'
              }
            })
            this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
          }, 200)
        })

      } else {
        this.options = []
      }
    },
    handleChange(data) {
      const { value, label } = data
      this.$emit('on-change', value, label)
    },
    handleClear(data) {
      if (data) {
        const { value, label } = data
        this.$emit('on-clear', value, label)
      } else {
        this.$emit('on-clear', '')
      }

    }
  }
}
</script>
