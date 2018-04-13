<template>
  <div class="app-container">
    <el-button class="add-chat" type="primary" @click="isShow=true">添加管理员</el-button>
    <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
      <el-form-item label="UID">
        <el-input v-model="search.uid"></el-input>
      </el-form-item>
      <el-form-item label="管理员昵称">
        <el-input v-model="search.nickName"></el-input>
      </el-form-item>
      <el-form-item class="account-search">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="reset">清除条件</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" class="account-table">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="userId" label="UID"></el-table-column>
      <el-table-column prop="userName" label="管理员昵称"></el-table-column>
      <el-table-column prop="" label="操作" >
        <template scope="scope">
          <el-button @click="removeAdmin(scope.$index)" type="text" size="small">删除</el-button>
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
    <!--添加管理员-->
    <msg-prompt :isShow="isShow" :title="pTitle" @get-prompt-status="getPromptStatus" @click-cancel="isShow = false" @click-sure="sureFun">
      <div class="el-message-box__status"></div>
      <div class="el-message-box__message" style="margin-left: 0px;"><p>猴子id</p></div>
      <div class="el-message-box__input" style="">
        <div class="el-input"><input autocomplete="off" placeholder="" type="text" v-model="adminInfo.uid" rows="2" validateevent="true" class="el-input__inner" @blur="getName" onkeyup="this.value=this.value.replace(/\D/g,'')"></div>
        <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
      </div>
      <div class="el-message-box__message" style="margin-left: 0px;"><p>猴子昵称</p></div>
      <div class="el-message-box__input" style="">
        <div class="el-input"><input autocomplete="off" placeholder="" type="text" v-model="adminInfo.nickName" :disabled="true" rows="2" validateevent="true" class="el-input__inner"></div>
        <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
      </div>
      <div class="el-message-box__message" style="margin-left: 0px;"><p></p></div>
      <div class="el-message-box__input" style="">
        <div class="el-input"><input autocomplete="off" placeholder="" type="text" v-model="noticeInfo" :disabled="true" rows="2" validateevent="true" class="el-input__inner notice"></div>
        <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
      </div>
    </msg-prompt>
  </div>
</template>

<script>
import msgPrompt from '../../components/page/msg-prompt.vue'
import { getAdmin,addAdmin,delAdmin,getSingle } from '@/api/admin'

export default {
  data() {
    return {
      isShow: false,
      noticeInfo:"",
      pTitle: '添加管理员',
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
      search: {
        uid:"",
        nickName:""
      },
      adminInfo:{
        uid:"",
        userName:"",
        nickName:""
      },
      beginTimeSelect: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      endTimeSelect: {},
      list: [
        {
          userId: '36',
          userName: 'test1',
          nickName: '测试',
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
        }
      ],
      currentPage: 1,
      visible2: false,
      pagesize:10,
      total:0,
      isExistUsername: false
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList(params){
      getAdmin(params).then(response=> {
        this.list = response.data.list
        this.total = response.data.totalCount
      })
    },
    reset(){
      this.search.uid=''
      this.search.nickName=''
      this.getList()
    },
    getPromptStatus(val) {
      this.isShow = val
    },
    getName(){
      this.adminInfo.nickName = ""
      if(this.adminInfo.uid.length>0){
        getSingle(this.adminInfo.uid).then(response=>{
            this.adminInfo.nickName = response.data.userName
            this.noticeInfo = ""
            this.isExistUsername = true
        }).catch(e=>{
          this.noticeInfo = "该用户不存在，请重新输入"
        })
      }
    },
    sureFun(evt) {
      if (!this.isExistUsername) {
        return false
      }
      this.$confirm('确定添加管理员吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        addAdmin(this.adminInfo.uid).then( response=>{
          this.$message({
            message: '添加管理员成功',
            type: 'success'
          })
          this.getList()
        }).catch(e=>{
          this.$notify.error({
            title: '错误',
            message: '添加失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      })
      this.isShow = false
    },
    onSubmit() {
      const params = {
        userId: this.search.uid,
        userName: this.search.nickName
      }
      this.getList(params)
      // this.search.uid = ""
      // this.search.nickName = ""
    },
    handleSizeChange(val) {
      const params = {
        size: val
      }
      this.getList(params)
    },
    handleCurrentChange(val) {
      const params = {
        num: val
      }
      getAdmin(params).then(response=> {
        this.list = response.data.list
      }).catch(e=> {
        this.$notify.error({
          title:"错误",
          message:'查询失败或者数据量不够'
        })
      })
    },
    removeAdmin(index) {
      const id = this.list[index].id
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAdmin(id).then(responese=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        });
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {
    'msg-prompt': msgPrompt
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
  .notice{
    border:none;
    color: red
  }
</style>
