<template>
  <Row>
    <Col span="17">
      <Card>
        <Table
          :data="visitorData"
          :columns="visitorColumns"
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
          <span>访客名：</span>
          <Input icon="pizza" placeholder="输入访客名" v-model="pageData.name"/>
        </div>
        <Divider dashed></Divider>
        <Button type="primary" @click="query">查询</Button>
        <Divider type="vertical"/>
        <!-- <Button type="warning" @click="handleCreate">创建</Button> -->
      </Card>
    </Col>
  </Row>
</template>
<script>
import * as visitor_api from "@/api/visitor";
export default {
  name: "visitor",
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      tabelLoading: true,
      visitorData: [],
      visitorColumns: [
        {
          type: "index",
          width: 60,
          fixed: "left",
          align: "center"
        },
        {
          title: "访客",
          align: "center",
          children: [
            {
              title: "姓名",
              minWidth: 90,
              align: "center",
              key: "name"
            },
            {
              title: "身份证",
              minWidth: 120,
              align: "center",
              key: "idCard"
            },
            {
              title: "电话",
              minWidth: 120,
              align: "center",
              key: "tel"
            }
          ]
        },
        {
          title: "公寓",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", params.row.apartment.name);
          }
        },
        {
          title: "访问事由",
          width: 100,
          align: "center",
          key: "reason"
        },

        {
          title: "创建时间",
          align: "center",
          width: 120,
          key: "createDate"
        },
        {
          title: "更新时间",
          align: "center",
          width: 120,
          key: "updateDate"
        },
        {
          title: "状态",
          fixed: "right",
          align: "center",
          minWidth: 130,
          render: (h, params) => {
            let color,
              text,
              { status } = params.row;
            switch (status) {
              case 1:
                color = "#ff9900";
                text = "审核中";
                break;
              case 2:
                color = "#2db7f5";
                text = "已审核";
                break;
              case 3:
                color = "#19be6b";
                text = "已进入";
                break;
              default:
                color = "#ed4014";
                text = "异常";
                break;
            }
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color
                }
              },
              text
            );
          }
        }
      ]
    };
  },
  methods: {
    getPage(page) {
      this.pageData.page = page;
      this.getVisitor();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getVisitor();
    },
    query() {
      this.pageData.page = 1;
      this.getVisitor();
    },
    async getVisitor() {
      try {
        this.tabelLoading = true;
        const result = await visitor_api.list(this.pageData);
        this.visitorData = result.data.list;
        this.total = result.data.total;
        this.tabelLoading = false;
        this.$Message.info(result.data.msg);
      } catch (error) {
        this.tabelLoading = false;
      }
    }
  },
  mounted() {
    this.getVisitor();
  }
};
</script>
