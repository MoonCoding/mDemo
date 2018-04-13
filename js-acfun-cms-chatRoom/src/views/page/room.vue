<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" class="demo-form-inline">
      <el-form-item label="聊天室ID">
        {{id}}
      </el-form-item>
      <el-form-item label="聊天室名称">
        {{name}}
      </el-form-item>
    </el-form>
    <el-button @click="showList" type="primary">修改</el-button>
    <div class="footer">
      <el-button type="primary" @click="onSubmit">确认提交</el-button>
      <el-button @click="reset">取消</el-button>
    </div>
    <chat-list
      :isShow="isShow"
      :selType="'radio'"
      @get-cl-status="getClStatus"
      @get-seleceted-data="getSelecetedData">
    </chat-list>
  </div>
</template>

<script>
import chatList from '../../components/page/chat-list.vue'
import { getChatList, publishHall } from '@/api/chat'
export default {
  data() {
    return {
      isShow: false,
      id: '',
      name: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let list, self = this
      getChatList({ type: 3 }).then(res => {
        if (res.code === 200) {
          list = res.data.list[0]
          self.id = list.id
          self.name = list.name
        }
      })
    },
    showList() {
      this.isShow = true
    },
    getClStatus(val) {
      this.isShow = val
    },
    getSelecetedData(val) {
      this.id = val.id
      this.name = val.name
    },
    onSubmit() {
      publishHall({ ids: this.id }).then( res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
    },
    reset() {
      this.getList()
    }
  },
  components: {
    'chat-list': chatList
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .footer{
    width: 100%;
    margin-top: 20px;
    text-align: right;
  }
</style>
