<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="goodsData"
            :columns="goodsColumns"
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
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Util from "@/libs/util";
export default {
  name: 'student',
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      tabelLoading: true,
      goodsData: [],
      goodsColumns: [
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
                        name: "goods_edit",
                        params: {
                          goodsId: params.row.id
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
  methods: {
    getPage(page) {
      this.pageData.page = page;
      this.getGoods();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getGoods();
    },
    query() {
      this.pageData.page = 1;
      this.getGoods();
    },
    getGoods() {
      this.tabelLoading = false
    }
  },
  mounted() {
    this.getGoods();
  }
};
</script>