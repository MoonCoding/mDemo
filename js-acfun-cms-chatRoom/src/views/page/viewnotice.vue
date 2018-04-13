<template>
  <div class="app-container">
    <ul>
      <li>
        <span>公告Id:</span>
        {{form.id}}
      </li>
      <li>
        <span>内容:</span>
        {{form.content}}
      </li>
      <li>
        <span>聊天室Id:</span>
        {{form.groupId}}
      </li>
      <li>
        <span>公告跳转链接:</span>
        {{form.url}}
      </li>
      <li>
        <span>状态:</span>
        {{form.state}}
      </li>
      <li>
        <span>公告开始时间:</span>
        {{form.startTimeF}}
      </li>
      <li>
        <span>公告截止时间:</span>
        {{form.endTimeF}}
      </li>
      <li>
        <span>排序:</span>
        {{form.sort}}
      </li>
      <li>
        <span>操作者:</span>
        {{form.updaterName}}
      </li>
      <li>
        <span>创建人Id:</span>
        {{form.createrId}}
      </li>
      <li>
        <span>创建日期:</span>
        {{form.createTimeF}}
      </li>
      <li>
        <span>更新人Id:</span>
        {{form.updaterId}}
      </li>
      <li>
        <span>最后更新日期:</span>
        {{form.updateTimeF}}
      </li>
    </ul>
  </div>
</template>

<script>
import { getNoticeDetail } from '@/api/chat'
import { parseTime } from '@/utils/utils'

export default {
  data() {
    return {
      form: {
        id: '',
        content: '',
        groupId: '',
        url: '',
        state: '',
        startTimeF: '',
        endTimeF: '',
        sort: '',
        updaterName: '',
        createrId: '',
        createTimeF: '',
        updaterId: '',
        updateTimeF: ''
      },
      stateData: {
        '0': '全部',
        '1': '待发布',
        '2': '在线',
        '3': '发布失败',
        '4': '已下线',
        '5': '已删除'
      },
    }
  },
  mounted() {
    let nid = this.$route.query.id
    this.getNoticeDetail(nid)
  },
  methods: {
    getNoticeDetail(nid) {
      let self = this
      getNoticeDetail(nid).then(res => {
        if ( res.code === 200 ) {
          self.form = res.data
          self.form.startTimeF = parseTime(res.data.startTime)
          self.form.endTimeF = parseTime(res.data.endTime)
          self.form.createTimeF = parseTime(res.data.createTime)
          self.form.updateTimeF = parseTime(res.data.updateTime)
          self.form.state = self.stateData[res.data.state]
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  li{
    margin-bottom: 20px;
    color: #324157
  }
</style>
