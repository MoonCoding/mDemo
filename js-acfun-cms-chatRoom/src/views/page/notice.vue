<template>
  <div class="app-container">
    <el-button class="add-chat" type="primary" @click="add">新建公告</el-button>
    <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
      <el-form-item label="公告ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="操作者">
        <el-input v-model="form.updaterName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="全部">
          <el-option v-for="item in stateDataArr"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间" class="createTime" label-width="80px">
        <el-date-picker
          v-model="form.selectStartTimeF"
          type="date"
          placeholder="选择日期"
          :picker-options="beginTimeSelect">
        </el-date-picker>
        <span> 至 </span>
        <el-date-picker
          v-model="form.selectEndTimeF"
          type="date"
          placeholder="选择日期"
          :picker-options="endTimeSelect">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="account-search">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">清除条件</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" class="account-table">
      <el-table-column prop="id" label="公告ID"></el-table-column>
      <el-table-column prop="content" label="公告内容" min-width="300"></el-table-column>
      <el-table-column prop="startTime" label="发布时间"></el-table-column>
      <el-table-column prop="updaterName" label="操作者"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="" label="操作" >
        <template scope="scope">
          <el-button @click="view(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="add($event,scope.row.id)" type="text" size="small" v-if="scope.row.editRight">编辑</el-button>
          <el-button @click="deleteBtn(scope.row.id)" type="text" size="small" v-if="scope.row.delRight">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        :current-page="page.num"
        :page-sizes="page.pageSizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getNoticeList, deleteNotice } from '@/api/chat'
import { parseTime, convertObjToArr, getUTCtimestamp } from '@/utils/utils'
export default {
  data() {
    return {
      form: {
        id: '',
        content: '',
        updaterName: '',
        state: '0',
        selectStartTimeF: '',
        selectEndTimeF: ''
      },
      stateData: {
        '0': '全部',
        '1': '待发布',
        '2': '在线',
        '3': '发布失败',
        '4': '已下线',
        '5': '已删除'
      },
      stateDataArr: [],
      beginTimeSelect: {},
      endTimeSelect: {},
      list: [],
      visible2: false,
      page: {
        num: 1,
        size: 20,
        total: null,
        pageSizes: [20, 30, 50, 100]
      }
    }
  },
  mounted() {
    this.stateDataArr = convertObjToArr(this.stateData)
    this.getList(this.page.num, this.page.size)
  },
  methods: {
    getList(num, size) {
      let i, params = {}, page = {}, self = this, enableEdit = [0, 1], enableDel = [0, 1, 2]
      page = {
        num: num,
        size: size
      }
      this.form.selectStartTime = this.form.selectStartTimeF && getUTCtimestamp(this.form.selectStartTimeF)
      this.form.selectEndTime = this.form.selectEndTimeF && getUTCtimestamp(this.form.selectEndTimeF)
      params = Object.assign({}, this.form, page)
      getNoticeList(params).then(res => {
        if (res.code === 200) {
          self.page.total = res.data.totalCount
          self.list = res.data.list
          for ( i in self.list) {
            if (enableEdit.indexOf(parseInt(self.list[i].state)) !== -1){
              self.list[i].editRight = true
            }else {
              self.list[i].editRight = false
            }
            if (enableDel.indexOf(parseInt(self.list[i].state)) !== -1) {
              self.list[i].delRight = true
            }else {
              self.list[i].delRight = false
            }

            self.list[i].state = self.stateData[self.list[i].state]
            self.list[i].startTime = parseTime(self.list[i].startTime)
          }
        }
      })
    },
    onSearch() {
      this.getList(this.page.num, this.page.size)
    },
    reset() {
      this.form = {
        id: '',
        content: '',
        updaterName: '',
        state: '0'
      }
      this.$set(this.form, 'selectStartTimeF', '')
      this.$set(this.form, 'selectEndTimeF', '')
      this.getList(this.page.num, this.page.size)
    },
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.getList(this.page.num, val)
    },
    pageNumChange(val) {
      console.log(`当前页: ${val}`)
      this.getList(val, this.page.size)
    },
    view(id) {
      this.$router.push({ path: '/crIssue/viewnotice', query: { id: id }})
    },
    add(evt,id) {
      id = id? id : ''
      this.$router.push({ path: '/crIssue/addnotice', query: { id: id }})
    },
    deleteBtn(id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNotice(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList(this.page.num, this.page.size)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', { style: 'color: red' }, '无法关闭！'),
          h('span', '该聊天室可能在"发布聊天室"、"大厅设置"、"热门聊天"中已发布，请先下线再尝试关闭！')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add-chat{
    margin-bottom: 20px
  }
  .pagination{
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }
</style>
