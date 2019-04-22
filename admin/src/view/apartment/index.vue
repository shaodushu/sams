<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="apartmentData"
            :columns="apartmentColumns"
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
          <Button type="info" @click="query">查询</Button>
          <Divider type="vertical"/>
          <Button type="warning" @click="handleCreate">创建</Button>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as apartment_api from "@/api/apartment";
export default {
  name: "apartment",
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      tabelLoading: true,
      apartmentData: [],
      apartmentColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "公寓名称",
          minWidth: 90,
          align: "center",
          key: "name"
        },
        {
          title: "公寓类型",
          minWidth: 90,
          align: "center",
          render: (h, params) => {
            return h("b", params.row.type === 1 ? "男生公寓" : "女生公寓");
          }
        },
        {
          title: "楼层",
          minWidth: 90,
          align: "center",
          key: "floor"
        },
        {
          title: "每层房间数",
          minWidth: 100,
          align: "center",
          key: "roomNum"
        },
        {
          title: "规则",
          minWidth: 90,
          align: "center",
          key: "rule"
        },
        {
          title: "通知",
          minWidth: 90,
          align: "center",
          key: "notice"
        },
        {
          title: "操作",
          fixed: "right",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                  padding: "5px"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
                    },
                    on: {
                      click: async () => {
                        try {
                          await apartment_api.remove(params.row.id);
                          this.getApartment();
                        } catch (error) {}
                      }
                    }
                  },
                  "删除"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginTop: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/apartment/detail/" + params.row.id
                        });
                      }
                    }
                  },
                  "详情"
                )
              ]
            );
          }
        }
      ]
    };
  },
  methods: {
    getPage(page) {
      this.pageData.page = page;
      this.getApartment();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getApartment();
    },
    query() {
      this.pageData.page = 1;
      this.getApartment();
    },
    async getApartment() {
      try {
        this.tabelLoading = true;
        const result = await apartment_api.list(this.pageData);
        this.apartmentData = result.data.list;
        this.total = result.data.total;
        this.tabelLoading = false;
        this.$Message.info(result.data.msg);
      } catch (error) {
        this.tabelLoading = false;
      }
    },
    handleCreate() {
      this.$router.push({ path: "/apartment/create" });
    }
  },
  mounted() {
    this.getApartment();
  }
};
</script>