<template>
  <div>
    <Row>
      <Col span="17">
        <Card>
          <Table
            :data="maintainData"
            :columns="maintainColumns"
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
            <span>联系方式：</span>
            <Input icon="pizza" placeholder="维修人员联系方式" v-model="pageData.rtel"/>
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
import * as maintain_api from "@/api/maintain";
export default {
  name: "maintain_log",
  data() {
    return {
      total: 0,
      pageData: {
        page: 1,
        size: 10,
        rtel: null
      },
      tabelLoading: true,
      maintainData: [],
      maintainColumns: [
        {
          type: "index",
          width: 60,
          fixed: "left",
          align: "center"
        },
        {
          title: "公寓",
          align: "center",
          children: [
            {
              title: "名称",
              minWidth: 90,
              align: "center",
              render: (h, params) => {
                return h("div", params.row.apartment.name);
              }
            },
            {
              title: "类型",
              align: "center",
              minWidth: 90,
              render: (h, params) => {
                return h(
                  "div",
                  params.row.apartment.type === 1 ? "男生公寓" : "女生公寓"
                );
              }
            }
          ]
        },
        {
          title: "维修人员",
          align: "center",
          children: [
            {
              title: "名称",
              minWidth: 90,
              align: "center",
              render: (h, params) => {
                return h("div", params.row.repair.name);
              }
            },
            {
              title: "联系方式",
              align: "center",
              minWidth: 120,
              render: (h, params) => {
                return h("div", params.row.repair.tel);
              }
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
                      color:
                        params.row.repair.status === "0" ? "warning" : "success"
                    }
                  },
                  params.row.repair.status === "0" ? "休息中" : "工作中"
                );
              }
            }
          ]
        },
        {
          title: "学生",
          align: "center",
          children: [
            {
              title: "联系方式",
              align: "center",
              minWidth: 120,
              key: "stel"
            }
          ]
        },
        {
          title: "宿舍号",
          width: 120,
          align: "center",
          key: "dnum"
        },
        {
          title: "图片",
          minWidth: 250,
          align: "center",
          key: "damage",
          render: (h, params) => {
            let imgList = params.row.imgList.split(",");

            return h("div",{
              style:{
                display:'flex',
                alignItem:'center',
                
              }
            }, [
              imgList.map(item => {
                return h("Avatar", {
                  style: {
                    margin: "5px"
                  },
                  props: {
                    shape: "square",
                    size: "large",
                    src: params.row.imgList.split(",")[0]
                  }
                });
              })
            ]);
          }
        },
        {
          title: "破损情况",
          minWidth: 120,
          align: "center",
          key: "damage"
        },
        {
          title: "处理状态",
          align: "center",
          minWidth: 130,
          render: (h, params) => {
            let { status } = params.row,
              color,
              text;
            if (status === "0") {
              color = "warning";
              text = "未处理";
            } else if (status === "1") {
              color = "success";
              text = "已处理";
            } else if (status === "-1") {
              color = "error";
              text = "已驳回";
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
        },
        {
          title: "处理结果",
          minWidth: 120,
          align: "center",
          key: "result"
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
                          await maintain_api.remove(params.row.id);
                          this.getMaintain();
                        } catch (error) {}
                      }
                    }
                  },
                  "删除"
                )
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "info",
                //       size: "small"
                //     },
                //     style: {
                //       marginTop: "5px"
                //     },
                //     on: {
                //       click: () => {
                //         this.$router.push({
                //           path: "/maintain/logDetail/" + params.row.id
                //         });
                //       }
                //     }
                //   },
                //   "详情"
                // )
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
      this.getMaintain();
    },
    getPageSize(size) {
      this.pageData.size = size;
      this.getMaintain();
    },
    query() {
      this.pageData.page = 1;
      this.getMaintain();
    },
    async getMaintain() {
      try {
        this.tabelLoading = true;
        const result = await maintain_api.list(this.pageData);
        this.maintainData = result.data.list;
        this.total = result.data.total;
        this.tabelLoading = false;
        this.$Message.info(result.data.msg);
      } catch (error) {
        this.tabelLoading = false;
      }
    }
  },
  mounted() {
    this.getMaintain();
  }
};
</script>