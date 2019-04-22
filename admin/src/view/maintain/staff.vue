<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="repairData"
            :columns="repairColumns"
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
            <span>维修人员名：</span>
            <Input icon="pizza" placeholder="输入维修人员名" v-model="pageData.name"/>
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
import * as repair_api from "@/api/repair";
export default {
  name: "repair",
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      tabelLoading: true,
      repairData: [],
      repairColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          align: "center",
          minWidth: 90,
          key: "name"
        },
        {
          title: "类型",
          align: "center",
          minWidth: 130,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.status === "0" ? "warning" : "success"
                }
              },
              params.row.status === "0" ? "休息中" : "工作中"
            );
          }
        },
        {
          title: "头像",
          minWidth: 90,
          align: "center",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                size: "large",
                src: params.row.avatar
              }
            });
          }
        },
        {
          title: "联系方式",
          minWidth: 110,
          align: "center",
          key: "tel"
        },
        {
          title: "创建时间",
          minWidth: 120,
          align: "center",
          key: "createDate"
        },
        {
          title: "更新时间",
          minWidth: 120,
          align: "center",
          key: "updateDate"
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
                          await repair_api.remove(params.row.id);
                          this.getRepair();
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
                          path: "/maintain/staffDetail/" + params.row.id
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
      this.getRepair();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getRepair();
    },
    query() {
      this.pageData.page = 1;
      this.getRepair();
    },
    async getRepair() {
      try {
        this.tabelLoading = true;
        const result = await repair_api.list(this.pageData);
        this.repairData = result.data.list;
        this.total = result.data.total;
        this.tabelLoading = false;
        this.$Message.info(result.data.msg);
      } catch (error) {
        this.tabelLoading = false;
      }
    },
    handleCreate() {
      this.$router.push({ path: "/maintain/createStaff" });
    }
  },
  mounted() {
    this.getRepair();
  }
};
</script>