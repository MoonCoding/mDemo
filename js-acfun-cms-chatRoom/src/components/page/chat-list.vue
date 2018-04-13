<template>
  <div v-if="isShow">
    <div class="el-message-box__wrapper" style="z-index: 9" @click.self="pclose">
      <div class="app-container el-message-box" style="width: 800px;height: 500px; overflow: scroll">
        <div class="el-message-box__header" style="padding:0 0 20px">
          <div class="el-message-box__title">添加聊天室</div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="pclose"><i class="el-message-box__close el-icon-close"></i></button>
        </div>
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="聊天室ID">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="聊天室名称">
            <el-input v-model="form.name"></el-input>
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
        <!--多选-->
        <el-table border style="width: 100%" class="account-table"
          :data="list"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="getCheckboxChange"
          max-height="700"
          v-if="selType=='checkbox'">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="聊天室ID"></el-table-column>
          <el-table-column prop="name" label="聊天室名称"></el-table-column>
          <el-table-column prop="txType" label="聊天室类型"></el-table-column>
          <el-table-column prop="onlineNumber" label="在线人数"></el-table-column>
          <el-table-column prop="createName" label="创建者"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" ></el-table-column>
        </el-table>
        <!--单选-->
        <el-table
        ref="singleTable"
        :data="list"
        highlight-current-row
        @current-change="getRadioChange"
        style="width: 100%"
        max-height="700"
        v-if="selType=='radio'">
        <el-table-column prop="id" label="聊天室ID"></el-table-column>
        <el-table-column prop="name" label="聊天室名称"></el-table-column>
        <el-table-column prop="txType" label="聊天室类型"></el-table-column>
        <el-table-column prop="onlineNumber" label="在线人数"></el-table-column>
        <el-table-column prop="createName" label="创建者"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" ></el-table-column>
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
        <div class="el-message-box__btns">
          <el-button type="primary" size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="sure">确定</el-button>
        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 2;" @click="pclose"></div>
  </div>
</template>

<script>
import { selectListChat } from '@/api/chat'
import { parseTime, getUTCtimestamp } from '@/utils/utils'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    selType: {
      type: String,
      default: 'checkbox'
    }
  },
  data() {
    return {
      shFlag: this.isShow,
      form: {
        id: '',
        name: '',
        selectStartTimeF: '',
        selectEndTimeF: ''
      },
      txTypeData: {
        '1': '普通聊天室',
        '2': '直播聊天室'
      },
      timeSelect: {},
      list: [],
      page: {
        num: 1,
        size: 20,
        total: null,
        pageSizes: [20, 30, 50, 100]
      },
      checkboxData: [],
      radioData: ''
    }
  },
  mounted() {
    this.getList(this.page.num, this.page.size)
  },
  methods: {
    pclose(evt) {
      this.shFlag = false
    },
    onSearch() {
      this.getList(this.page.num, this.page.size)
    },
    reset() {
      this.form = {
        id: '',
        name: ''
      }
      this.$set(this.form, 'selectStartTimeF', '')
      this.$set(this.form, 'selectEndTimeF', '')
      this.getList(this.page.num, this.page.size)
    },
    getList(num, size) {
      let i, params = {}, page = {}, self = this
      page = {
        num: num,
        size: size
      }
      this.form.selectStartTime = this.form.selectStartTimeF && getUTCtimestamp(this.form.selectStartTimeF)
      this.form.selectEndTime = this.form.selectEndTimeF && getUTCtimestamp(this.form.selectEndTimeF)
      params = Object.assign({}, this.form, page)
      selectListChat(params).then(res => {
        if (res.code === 200) {
          self.page.total = res.data.totalCount
          self.list = res.data.list
          for ( i in self.list) {
            self.list[i].createTime = parseTime(self.list[i].createTime)
            self.list[i].txType = self.txTypeData[self.list[i].txType]
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
    getRadioChange(val) {
      this.radioData = val
    },
    getCheckboxChange(val) {
      this.checkboxData = val
    },
    sure() {
      let params = this.selType === 'checkbox' ? this.checkboxData : this.radioData
      this.$emit('get-seleceted-data', params)
      this.shFlag = false
    },
    cancel(evt) {
      this.shFlag = false
    }
  },
  watch: {
    isShow(n) {
      this.shFlag = n
    },
    shFlag(n) {
      this.$emit('get-cl-status', n)
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
