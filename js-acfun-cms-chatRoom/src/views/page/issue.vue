<template>
  <div class="app-container">
    <el-button class="add-chat" type="primary" @click="addChat">添加聊天室</el-button>
    <el-table :data="list" border style="width: 100%" class="account-table">
      <el-table-column prop="" label="排序">
        <template scope="scope">
          <el-input v-model="scope.row.sort"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="聊天室ID"></el-table-column>
      <el-table-column prop="name" label="聊天室名称"></el-table-column>
      <el-table-column prop="txType" label="聊天室类型"></el-table-column>
      <el-table-column prop="createName" label="创建者"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column prop="" label="操作" >
        <template scope="scope">
          <el-button @click="deleteBtn(scope.row.id, scope.$index)" type="text" size="small" v-if="scope.row.issued">移除</el-button>
          <el-button @click="deleteArr(scope.$index)" type="text" size="small" v-if="!scope.row.issued">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" @click="onSubmit">确认提交</el-button>
      <el-button @click="reset">取消</el-button>
    </div>

    <chat-list
      :isShow="isShow"
      :selType="'checkbox'"
      @get-cl-status="getClStatus"
      @get-seleceted-data="getSelecetedData">
    </chat-list>
  </div>
</template>

<script>
import chatList from '../../components/page/chat-list.vue'
import { getChatList, publishChat, cancelpublish } from '@/api/chat'
import { parseTime } from '@/utils/utils'
export default {
  data() {
    return {
      list: [],
      isShow: false,
      txTypeData: {
        '1': '普通聊天室',
        '2': '直播聊天室'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let i, tempList = [], self = this
      getChatList({ type: 0 }).then(res => {
        if (res.code === 200) {
          tempList = res.data.list
          for (i in tempList) {
            tempList[i].txType = self.txTypeData[tempList[i].txType]
            tempList[i].createTime = parseTime(tempList[i].createTime)
            tempList[i].issued = true
          }
          self.list = self.list.concat(tempList)
        }
      })
    },
    addChat() {
      this.isShow = true
    },
    getClStatus(val) {
      this.isShow = val
    },
    getSelecetedData(val) {
      let i
      for (i in val) {
        val[i].issued = false
      }
      this.list = this.list.concat(val)
    },
    onSubmit() {
      let params = []
      this.list.forEach(function(item) {
        params.push({
          id: item.id,
          sort: parseInt(item.sort),
          state: item.state
        })
      })
      publishChat(params).then( res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.list = []
          this.getList()
        }
      })
    },
    reset() {
      this.list = []
      this.getList()
    },
    deleteArr(index) {
      let self = this
      this.$confirm('移除该聊天室?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.list.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteBtn(id, index) {
      let self = this
      this.$confirm('移除该聊天室?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelpublish(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '移除成功!'
            })
            this.list.splice(index, 1)
          }
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
    'chat-list': chatList
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
  .footer{
    margin-top: 20px;
    text-align: right;
  }
</style>
