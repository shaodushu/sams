<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="adminData"
            :columns="adminColumns"
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
            <span>管理员名：</span>
            <Input icon="pizza" placeholder="输入管理员名" v-model="pageData.name"/>
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
import * as admin_api from "@/api/admin";
export default {
  name: "admin",
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      tabelLoading: true,
      adminData: [],
      adminColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          align: "center",
          minWidth: 100,
          key: "name"
        },
        {
          title: "类型",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "b",
              params.row.access === 1 ? "宿舍管理员" : "超级管理员"
            );
          }
        },
        {
          title: "头像",
          minWidth: 70,
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
          minWidth: 110,
          align: "center",
          key: "createDate"
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
                          await admin_api.remove(params.row.id);
                          this.getAdmin();
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
                          path: "/admin/detail/" + params.row.id
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
      this.getAdmin();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getAdmin();
    },
    query() {
      this.pageData.page = 1;
      this.getAdmin();
    },
    async getAdmin() {
      try {
        this.tabelLoading = true;
        const result = await admin_api.list(this.pageData);
        this.adminData = result.data.list;
        this.total = result.data.total;
        this.tabelLoading = false;
        this.$Message.info(result.data.msg);
      } catch (error) {
        this.tabelLoading = false;
      }
    },
    handleCreate() {
      this.$router.push({ path: "/admin/create" });
    }
  },
  mounted() {
    this.getAdmin();
  }
};
</script>