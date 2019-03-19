
<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="waterData"
            :columns="waterColumns"
            stripe
            ref="tabel"
            :loading="tabelLoading"
            :border="true"
          ></Table>
          <Divider dashed></Divider>
          <Page
            :total="total"
            size="small"
            show-total
            show-elevator
            show-sizer
            placement="top"
            :page-size="pageData.size"
            :current="pageData.page"
            @on-change="getPage"
            @on-page-size-change="getPageSize"
          ></Page>
        </Card>
      </Col>
      <Col span="6" offset="1">
        <Card style="position: fixed;">
          <p slot="title">
            <Icon type="ios-flask"></Icon>
            <span>操作</span>
          </p>
          <div class="margin-bottom-10">
            <span>公寓名：</span>
            <Input icon="pizza" placeholder="输入公寓名" v-model="pageData.name"/>
          </div>
          <Divider dashed></Divider>
          <Button type="primary" @click="query">查询</Button>
          <Divider type="vertical"/>
          <Button type="warning" @click="handleOpenModal">导入</Button>
        </Card>
      </Col>
    </Row>
    <Modal
      v-model="modal"
      :loading="importLoading"
      draggable
      scrollable
      :closable="false"
      ok-text="导入"
      @on-ok="handleImport"
      title="用水数据导入"
    >
      <Form :model="formItem" :label-width="80" ref="downloadForm">
        <FormItem label="公寓名称">
          <SelectBox
            ref="selectBox"
            placeholder="导入的公寓名称..."
            :list="apartmentList"
            @on-clear="handleClear"
            @on-change="handleChange"
          />
        </FormItem>
        <FormItem label="导入文件">
          <Upload :before-upload="handleUpload" action>
            <Button icon="ios-cloud-upload-outline">
              <span v-if="formItem.file===null">选择导入文件</span>
              <span v-else>{{ formItem.file.name }}</span>
            </Button>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import SelectBox from '@/components/select-box'
import * as apartment_api from "@/api/apartment"
import * as water_api from "@/api/water"
export default {
  name: 'water',
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      formItem: {
        aid: '',
        file: null
      },
      tabelLoading: true,
      importLoading: true,
      modal: false,//用水导入面板
      apartmentList: [],
      waterData: [],
      waterColumns: [
        {
          type: "index",
          width: 60,
          fixed: "left",
          align: "center"
        },
        {
          title: "公寓名称",
          width: 120,
          align: "center",
          key: "name"
        },
        {
          title: "公寓类型",
          width: 120,
          align: "center",
          key: "type"
        },
        {
          title: "品牌",
          width: 120,
          align: "center",
          key: "brand"
        },
        {
          title: "库存",
          width: 120,
          align: "center",
          key: "inventory"
        },
        {
          title: "操作",
          fixed: "right",
          width: 150,
          align: "center",
          render: (h, params) => {
            let color, text;
            switch (params.row.status) {
              case 0:
                color = "success";
                text = "上架";
                break;
              case 1:
                color = "warning";
                text = "下架";
                break;
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "water_edit",
                        params: {
                          waterId: params.row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: color,
                    loading: params.row.loading,
                    size: "small"
                  },
                  on: {
                    click: () => {
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    SelectBox
  },
  methods: {
    getPage(page) {
      this.pageData.page = page;
      this.getWater();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getWater();
    },
    query() {
      this.pageData.page = 1;
      this.getWater();
    },
    getWater() {
      this.tabelLoading = false
    },
    async handleOpenModal() {
      this.modal = true
      try {
        const { list } = (await apartment_api.list({
          page: 1,
          size: 100
        })).data
        this.apartmentList = list
      } catch (error) {

      }
    },
    async handleImport() {
      this.importLoading = true
      let formData = new FormData()
      formData.append('file', this.formItem.file)
      formData.append('aid', this.formItem.aid)
      try {
        const list = await water_api.importWater(formData)
        this.importLoading = false
      } catch (error) {
        this.importLoading = false
      }
    },
    handleChange(value) {
      this.formItem.aid = value
    },
    handleClear(value) {
      this.formItem.aid = value
    },
    handleUpload(file) {
      this.formItem.file = file;
      return false;
    }
  },
  mounted() {
    this.getWater();
  }
};
</script>