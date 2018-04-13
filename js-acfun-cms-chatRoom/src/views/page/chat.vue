<template>
  <div class="app-container">
    <el-button class="add-chat" type="primary" @click="add">新建聊天室</el-button>
    <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
      <el-form-item label="聊天室ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="聊天室名称">
        <el-input v-model="form.name"></el-input>
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
      <el-form-item label="创建时间" class="createTime" label-width="80px">
        <el-date-picker
          v-model="form.selectStartTimeF"
          type="date"
          placeholder="选择日期"
          :picker-options="timeSelect">
        </el-date-picker>
        <span> 至 </span>
        <el-date-picker
          v-model="form.selectEndTimeF"
          type="date"
          placeholder="选择日期"
          :picker-options="timeSelect">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="account-search">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="reset">清除条件</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border style="width: 100%" class="account-table">
      <el-table-column prop="id" label="聊天室ID"></el-table-column>
      <el-table-column prop="name" label="聊天室名称"></el-table-column>
      <el-table-column prop="txType" label="聊天室类型"></el-table-column>
      <el-table-column prop="onlineNumber" label="在线人数"></el-table-column>
      <el-table-column prop="updaterName" label="操作人"></el-table-column>
      <el-table-column prop="updateTime" label="操作时间" ></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="" label="操作" >
        <template scope="scope">
          <el-button @click="add($event,scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteBtn(scope.row.id, 0)" type="text" size="small">关闭</el-button>
          <el-button @click="deleteBtn(scope.row.id, 1)" type="text" size="small">开启</el-button>
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
    <!--添加管理员-->
    <msg-prompt :isShow="isShow" :title="pTitle" @get-prompt-status="getPromptStatus" @click-cancel="cancelFun" @click-sure="sureFun">
      <div class="el-message-box__status"></div>
      <div class="el-message-box__message" style="margin-left: 0px;"><p>聊天室名称</p></div>
      <div class="el-message-box__input" style="">
        <el-input v-model="addData.name" placeholder="最多可输入12个字符"></el-input>
        <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
      </div>
      <div class="el-message-box__message" style="margin-left: 0px;"><p>聊天室类型</p></div>
      <div class="el-message-box__input" style="">
        <template>
          <el-radio-group v-model="addData.txType">
            <!-- <el-radio :label="1" :disabled="true">普通聊天室</el-radio> -->
            <el-radio :label="2">直播聊天室</el-radio>
          </el-radio-group>
        </template>
        <div class="beizhu">&nbsp&nbsp&nbsp&nbsp&nbsp注：普通聊天室：最大容纳10000人，支持删除某人言论。 直播聊天室：无人数上限，但不能删除言论。</div>
        <div class="el-message-box__errormsg error" v-if="checkedFalse">
          请输入合法的聊天室名称
        </div>
      </div>
    </msg-prompt>
  </div>
</template>

<script>
import { getChatList, addChat, deleteChat, getChatDetail, updateChat } from '@/api/chat'
import { parseTime, convertObjToArr, getUTCtimestamp, testInput } from '@/utils/utils'
import msgPrompt from '../../components/page/msg-prompt.vue'

export default {
  data() {
    return {
      isShow: false,
      pTitle: '添加聊天室',
      form: {
        id: '',
        name: '',
        state: '',
        selectStartTimeF: '',
        selectEndTimeF: ''
      },
      addData: {
        name: '',
        txType: 2
      },
      stateData: {
        '': '全部',
        '0': '关闭',
        '1': '开启',
        '2': '发布'
      },
      txTypeData: {
        '1': '普通聊天室',
        '2': '直播聊天室'
      },
      stateDataArr: [],
      txTypeDataArr: [],
      timeSelect: {},
      list: [],
      page: {
        num: 1,
        size: 20,
        total: null,
        pageSizes: [20, 30, 50, 100]
      },
      flag: 'add',
      checkedFalse: false,
      aaa: ''
    }
  },
  mounted() {
    this.stateDataArr = convertObjToArr(this.stateData)
    this.getList(this.page.num, this.page.size)
  },
  methods: {
    getList(num, size) {
      let i, params = {}, page = {}, self = this
      page = {
        num: num,
        size: size
      }
      this.form.selectStartTime = this.form.selectStartTimeF && getUTCtimestamp(this.form.selectStartTimeF)
      this.form.selectEndTime = this.form.selectEndTimeF && getUTCtimestamp(this.form.selectEndTimeF)
      params = Object.assign({}, this.form, page)
      getChatList(params).then(res => {
        if (res.code === 200) {
          self.page.total = res.data.totalCount
          self.list = res.data.list
          for ( i in self.list) {
            self.list[i].state = self.stateData[self.list[i].state]
            self.list[i].txType = self.txTypeData[self.list[i].txType]
            self.list[i].updateTime = parseTime(self.list[i].updateTime)
          }
        }
      })
    },
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.getList(this.page.num, val)
    },
    pageNumChange(val) {
      console.log(`当前页: ${val}`)
      this.getList(val, this.page.size)
    },
    onSearch() {
      this.getList(this.page.num, this.page.size)
    },
    reset() {
      this.form = {
        id: '',
        name: '',
        state: ''
      }
      this.$set(this.form, 'selectStartTimeF', '')
      this.$set(this.form, 'selectEndTimeF', '')
      this.getList(this.page.num, this.page.size)
    },
    add(evt,id) {
      let self = this
      this.isShow = true
      if (id) {
        this.flag = 'update'
        getChatDetail(id).then(res => {
          if ( res.code === 200 ) {
            self.addData = Object.assign({}, res.data)
          }
        })
      } else {
        this.flag = 'add'
        this.addData = {
          name: '',
          txType: 2
        }
      }
    },
    getPromptStatus(val) {
      this.isShow = val
    },
    cancelFun(evt) {
      this.isShow = false
    },
    sureFun(evt) {
      if (!testInput(this.addData.name, 12)) {
        this.checkedFalse = true
        return false
      }
      if (this.flag === 'add') {
        addChat(this.addData).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3000
            })
            this.isShow = false
            this.getList(this.page.num, this.page.size)
          }
        })
      } else if (this.flag === 'update') {
        let updataData = {
          id: this.addData.id,
          name: this.addData.name,
          txType: this.addData.txType
        }
        updateChat(updataData).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3000
            })
            this.isShow = false
            this.getList(this.page.num, this.page.size)
          }
        })
      }
    },
    deleteBtn(id, flag) {
      let text
      text = flag === 1? '开启' : '关闭'
      this.$confirm('确定要' + text + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteChat({ id: id, state: flag}).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: text + '成功!'
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
  .beizhu{
    font-size: 12px;
    color: #324157;
    margin-top: 10px
  }
  .error{
    margin-top: 10px;
  }
</style>
