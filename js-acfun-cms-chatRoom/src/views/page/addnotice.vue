<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公告内容">
        <el-input type="textarea" v-model="form.content" placeholder="公告内容最大50个字符"></el-input>
      </el-form-item>
      <!--<el-form-item label="跳转类型">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="链接">
        <el-input v-model="form.url" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" class="createTime" label-width="80px">
        <el-date-picker
          v-model="form.startTimeF"
          type="datetime"
          placeholder="选择日期时间"
          :picker-options="timeSelect">
        </el-date-picker>
        <span> 至 </span>
        <el-date-picker
          v-model="form.endTimeF"
          type="datetime"
          placeholder="选择日期时间"
          :picker-options="timeSelect">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addNotice, getNoticeDetail, updateNotice } from '@/api/chat'
import { getUTCtimestamp, parseTime, testInput } from '@/utils/utils'

export default {
  data() {
    return {
      form: {
        content: '',
        url: '',
        groupId: '0',
        startTimeF: '',
        endTimeF: '',
        sort: ''
      },
      timeSelect: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      state: 'add'
    }
  },
  mounted() {
    let nid = this.$route.query.id
    console.log('id::::', nid)
    nid && this.getNoticeDetail(nid)
  },
  methods: {
    getNoticeDetail(nid) {
      this.state = 'update'
      let self = this
      getNoticeDetail(nid).then(res => {
        if ( res.code === 200 ) {
          self.form = res.data
          let startTime = res.data.startTime
          let endTime = res.data.endTime
          self.$set(self.form, 'startTimeF', new Date(parseTime(startTime)))
          self.$set(self.form, 'endTimeF', new Date(parseTime(endTime)))
        }
      })
    },
    reset() {
      if (this.state === 'add' ) {
        this.form = {
          content: '',
          url: '',
          groupId: '0',
          sort: ''
        }
        this.$set(this.form, 'startTimeF', '')
        this.$set(this.form, 'endTimeF', '')
      } else if (this.state === 'update' ){
        this.getNoticeDetail(this.$route.query.id)
      }

    },
    onSubmit() {
      if (!testInput(this.form.content, 50)) {
        this.$message({
          message: '请输入合法的公告内容',
          type: 'warning',
          duration: 2000
        })
        return false
      }
//      if (!this.form.url) {
//        this.$message({
//          message: '请输入合法的链接',
//          type: 'warning',
//          duration: 2000
//        })
//        return false
//      }
      if (!this.form.startTimeF) {
        this.$message({
          message: '请输入合法的起始时间',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      if (!this.form.endTimeF) {
        this.$message({
          message: '请输入合法的截止时间',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.form.startTime = getUTCtimestamp(this.form.startTimeF)
      this.form.endTime = getUTCtimestamp(this.form.endTimeF)
      if (this.state === 'add' ){
        addNotice(this.form).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3000
            })
            this.$router.push({ path: '/crIssue/notice'})
          }
        })
      }else if (this.state === 'update') {
        updateNotice(this.form).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3000
            })
            this.$router.push({ path: '/crIssue/notice'})
          }
        })
      }

    }
  }
}
</script>
