<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="studentData"
            :columns="studentColumns"
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
            <span>学生名：</span>
            <Input icon="pizza" placeholder="输入学生名" v-model="pageData.name"/>
          </div>
          <Divider dashed></Divider>
          <Button type="primary" @click="query">查询</Button>
          <Divider type="vertical"/>
          <Button type="warning" @click="handleCreate">创建</Button>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as student_api from "@/api/student";
export default {
  name: "student",
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        name: null
      },
      tabelLoading: true,
      studentData: [],
      studentColumns: [
        {
          type: "index",
          width: 60,
          fixed: "left",
          align: "center"
        },
        {
          title: "名称",
          align: "center",
          width: 100,
          key: "name"
        },
        {
          title: "头像",
          width: 70,
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
          title: "所属公寓",
          align: "center",
          width: 100,
          key: "aname"
        },
        {
          title: "宿舍号",
          align: "center",
          width: 100,
          key: "dnum"
        },
        {
          title: "学院",
          align: "center",
          width: 100,
          key: "college"
        },
        {
          title: "班级",
          align: "center",
          width: 100,
          key: "class"
        },
        {
          title: "学号",
          align: "center",
          width: 100,
          key: "snum"
        },
        {
          title: "联系方式",
          align: "center",
          width: 115,
          key: "tel"
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
                          await student_api.remove(params.row.id);
                          this.getStudent();
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
                          path: "/student/detail/" + params.row.id
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
      this.getStudent();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getStudent();
    },
    query() {
      this.pageData.page = 1;
      this.getStudent();
    },
    async getStudent() {
      try {
        this.tabelLoading = true;
        const result = await student_api.list(this.pageData);
        this.studentData = result.data.list;
        this.total = result.data.total;
        this.tabelLoading = false;
        this.$Message.info(result.data.msg);
      } catch (error) {
        this.tabelLoading = false;
      }
    },
    handleCreate() {
      this.$router.push({ path: "/student/create" });
    }
  },
  mounted() {
    this.getStudent();
  }
};
</script>