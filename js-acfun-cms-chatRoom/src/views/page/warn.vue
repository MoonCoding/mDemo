<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
      <el-form-item label="被举报内容ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="举报类型">
        <el-select v-model="form.type" placeholder="全部">
          <el-option v-for="item in typeDataArr"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="被举报UID">
        <el-input v-model="form.defendantId"></el-input>
      </el-form-item>
      <el-form-item label="被举报昵称">
        <el-input v-model="form.defendantName"></el-input>
      </el-form-item>
      <el-form-item label="处罚结果">
        <el-select v-model="form.punishResult" placeholder="全部">
          <el-option v-for="item in punishResultDataArr"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="form.operaterName"></el-input>
      </el-form-item>
      <el-form-item class="account-search">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">清除条件</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" class="account-table">
      <el-table-column prop="id" label="被举报内容ID"></el-table-column>
      <el-table-column prop="groupName" label="来源"></el-table-column>
      <el-table-column prop="typeName" label="举报类型"></el-table-column>
      <el-table-column prop="content" label="被举报内容" min-width="300"></el-table-column>
      <el-table-column prop="defendantId" label="被举报UID"></el-table-column>
      <el-table-column prop="defendantName" label="被举报昵称"></el-table-column>
      <el-table-column prop="times" label="举报人次"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="resultDesc" label="处罚结果"></el-table-column>
      <el-table-column prop="operaterName" label="操作人"></el-table-column>
      <el-table-column prop="" label="操作">
        <template scope="scope">
          <el-button @click="updateContent(5,scope.$index)" type="text" size="small">无效举报</el-button>
          <el-button @click="updateContent(3,scope.$index)" type="text" size="small">删除言论</el-button>
          <el-button @click="restrict(1,scope.$index)" type="text" size="small">禁言</el-button>
          <el-button @click="restrict(2,scope.$index)" type="text" size="small">禁用聊天</el-button>
          <el-button @click="restrict(4,scope.$index)" type="text" size="small">封禁账号</el-button>
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
    <!--禁言选项-->
    <msg-prompt :isShow="isShow" :title="pTitle" @get-prompt-status="getPromptStatus" @click-cancel="isShow=false" @click-sure="confirmRestrict">
      <ul class="warn-select">
        <li class="ws-cell" :class="{'active' :ind === 0}" style="background-color: #43a8dc" @click="resTime(0)">3天</li>
        <li class="ws-cell" :class="{'active' :ind === 1}" style="background-color: #3b6abc" @click="resTime(1)">1周</li>
        <li class="ws-cell" :class="{'active' :ind === 2}" style="background-color: #535dbe" @click="resTime(2)">2周</li>
        <li class="ws-cell" :class="{'active' :ind === 3}" style="background-color: #6b4aa3" @click="resTime(3)">1月</li>
        <li class="ws-cell" :class="{'active' :ind === 4}" style="background-color: #964ba6" @click="resTime(4)">3月</li>
        <li class="ws-cell" :class="{'active' :ind === 5}" style="background-color: #a94696" @click="resTime(5)">永久</li>
      </ul>
    </msg-prompt>
  </div>
</template>

<script>
import msgPrompt from '../../components/page/msg-prompt.vue'
import { convertObjToArr } from '@/utils/utils'
import { getWarnList, updateWarn, getNoList, cancleNo} from '@/api/chat'

export default {
  data() {
    return {
      isShow: false,
      pTitle: '禁言',
      form: {
        id:"",
        type:"",
        defendantId:"",
        defendantName:"",
        punishResult:"",
        operaterName:'',
        num:1,
        size:20
      },
      ind:0,
      typeData: {
        '': '全部',
        '1': '色情',
        '2': '血腥',
        '3': '暴力',
        '4': '猎奇',
        '5': '政治',
        '6': '辱骂',
        '7': '广告',
        '8': '挖坟',
        '9': '剧透',
        '0': '其他'
      },
      punishResultData: {
        '': '全部',
        '1': '禁言',
        '2': '禁用聊天',
        '3': '删除言论',
        '4': '封禁帐号',
        '5': '无效举报'
      },
      stateData: {
        '1': '已处理',
        '0': '待处理'
      },
      typeDataArr: [],
      punishResultDataArr: [],
      stateDataArr: [],
      beginTimeSelect: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      endTime:[
        3*86400,
        7*86400,
        14*86400,
        30*86400,
        90*86400,
        4294967295
      ],
      endTimeSelect: {},
      list: [
        {
          id: '',
          groupName: '',
          type: '',
          typeName:"",
          content: '',
          defendantId: '',
          defendantName: '',
          times: '',
          punishResult: '',
          operaterName: 'AC娘',
          operaterId: '',
          state:1,
          groupId: ''
        }
      ],
      status: [
        "未处理",
        "已处理"
      ],
      result:[
        "禁言",
        "禁用聊天",
        "删除言论",
        "封禁账号",
        "无效举报",
      ],
      currentPage: 1,
      visible2: false,
      curType: 1,
      curIndex: 0,
      restrictTime: 3*86400,
      total:20,
      pagesize: 20
    }
  },
  mounted() {
    this.typeDataArr = convertObjToArr(this.typeData)
    this.punishResultDataArr = convertObjToArr(this.punishResultData)
    this.fetchData()
  },
  methods: {
    fetchData(){
      getWarnList().then(response=>{
        this.list = this.ergodic(response.data.list, this.status, this.result, this.typeData)
        this.total = response.data.totalCount
      })
    },
    ergodic(arr1,arr2,arr3,arr4){
      for(var i in arr1){
        arr1[i].status = arr2[arr1[i].state]
//        console.log(arr1[i].punishResult)
        arr1[i].resultDesc = arr3[arr1[i].punishResult-1]
        arr1[i].typeName = arr4[arr1[i].type]
      }
      return arr1
    },
    restrict(type,index) {
      this.isShow = true
      this.curType = type
      this.curIndex = index
      switch (type) {
        case 1:
          this.pTitle = '禁言'
          break
        case 2:
          this.pTitle = '禁用聊天'
          break
        case 4:
          this.pTitle = '封禁账号'
          break
      }
    },
    resTime(index){
      this.restrictTime = this.endTime[index]
      console.log('112233', this.restrictTime)
      this.ind = index
    },
    getPromptStatus(val) {
      this.isShow = val
    },
    cancelFun(evt) {
      this.isShow = false
    },
    confirmRestrict() {
      const id = this.list[this.curIndex].id
      const params = {
        punishResult: this.curType,
        punishDuration: this.restrictTime
      }
      updateWarn(id,params).then(response=> {
        this.$message({
          type: 'success',
          message: '处理成功!'
        });
        this.fetchData()
      })
      this.isShow = false
    },
    onSubmit() {
      console.log('submit!')
    },
    reset() {
      this.form = {
        id:"",
        type:"",
        defendantId:"",
        defendantName:"",
        punishResult:"",
        operaterName:'',
        num:1,
        size:20
      }
      this.fetchData()
    },
    onSearch(){
      getWarnList(this.form).then(response=>{
        this.list = this.ergodic(response.data.list, this.status, this.result, this.typeData)
        this.total = response.data.totalCount
      })
    },
    handleClick() {
//      console.log(1)
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.form.size = this.pagesize
      getWarnList(this.form).then(response=>{
        this.list = this.ergodic(response.data.list, this.status, this.result, this.typeData)
        this.total = response.data.totalCount
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.form.num = this.currentPage
      getWarnList(this.form).then(response=>{
        this.list = this.ergodic(response.data.list, this.status, this.result, this.typeData)
        this.total = response.data.totalCount
      })
    },
    updateContent(type,index) {
      this.$confirm('确定对该言论执行"'+this.punishResultData[type]+'"操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const time = parseInt(new Date()/1000)
        const params = {
          punishResult: type,
          punishDuration: time
        }
        updateWarn(this.list[index].id, params).then(response=>{
          this.$message({
            type: 'success',
            message: '处理成功!'
          });
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
  .ws-cell{
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
  }
  .ws-cell:hover{
    cursor: pointer;
  }
  ul .active{
    color: #f00;
    border:1px solid red
  }
</style>
