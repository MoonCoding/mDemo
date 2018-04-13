<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="search.id"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="search.nickName"></el-input>
      </el-form-item>
      <el-form-item class="account-search">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="reset">清除条件</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" class="account-table">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="defendantId" label="UID"></el-table-column>
      <el-table-column prop="defendantName" label="用户昵称"></el-table-column>
      <el-table-column prop="groupName" label="禁言聊天室"></el-table-column>
      <el-table-column prop="forbidTime" label="禁言时间" min-width="200"></el-table-column>
      <el-table-column prop="" label="操作" >
        <template scope="scope">
          <el-button @click="open2(scope.$index)" type="text" size="small">取消禁言</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getNoList, cancleNo} from '@/api/chat'
import { parseTime } from '@/utils/utils'

export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        beginTime: '',
        endTime: ''
      },
      search:{
        id:"",
        nickName:""
      },
      forbid:{
        defendantId:"",
        defendantName:"",
        punishResult:1,
        num:1,
        size:20
      },
      beginTimeSelect: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      endTimeSelect: {},
      list: [],
      currentPage: 1,
      visible2: false,
      pagesize:10,
      total:0
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    onSubmit() {
      this.forbid.defendantId = this.search.id
      this.forbid.defendantName = this.search.nickName
      getNoList(this.forbid).then(response=>{
        this.list = this.timeFormat(response.data.list)
        this.total = response.data.totalCount
      })
    },
    reset(){
      this.search.id=''
      this.search.nickName=''
      this.getList()
    },
    handleClick() {
      console.log(1)
    },
    timeFormat(arr){
      for(let i in arr){
        arr[i].forbidTime = parseTime(arr[i].punishBegin)+"---"+parseTime(arr[i].punishEnd)
      }
      return arr
    },
    getList(){
      getNoList(this.forbid).then(response=>{
        this.list = this.timeFormat(response.data.list)
        this.total = response.data.totalCount
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.forbid.size = this.pagesize
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.forbid.num = this.currentPage
      this.getList()
    },
    open3() {
      this.$prompt('请输入聊天室名称', '聊天室信息', {
        inputPlaceholder: '仅限12个字符',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '',
        inputErrorMessage: '聊天室名称最大12j个字符哦~'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '您输入的聊天室名称是: ' + value
        });
        let aa = {
          userId: '36',
          userName: 'test1',
          nickName: '测试323',
          email: 'test1@acfun.cn',
          passwd: '404f3d17d28fa205043097ee8ec756b3',
          mobile: '18611111111',
          departmentId: '18',
          departmentName: '测试',
          state: 1,
          createrId: '12344444',
          createTime: 1504495193278,
          updaterId: '12344444',
          updateTime: 1504495193278
        };
        this.list.push(aa)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    open2(index) {
      this.$confirm('将会取消该用户的禁言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = this.list[index].id
        cancleNo(id).then(response=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          getNoList(this.forbid).then(response=>{
            this.list = this.timeFormat(response.data.list)
            this.total = response.data.totalCount
          })
        })
      })
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
