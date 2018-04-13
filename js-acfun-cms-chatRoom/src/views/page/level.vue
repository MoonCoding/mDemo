<template>
  <div class="app-container">
    <el-select v-model="needGrade" placeholder="">
      <el-option v-for="item in levelDataArr"
                 :key="item.value"
                 :label="item.name"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="onSubmit">确认提交</el-button>
    <el-button type="primary" @click="reset">取消</el-button>
  </div>
</template>

<script>
import { chatLevel, getLevel } from '@/api/chat'
import { convertObjToArr } from '@/utils/utils'
export default {
  data() {
    return {
      needGrade: '0',
      levelData: {
        '0': '无要求',
        '1': '至少一级',
        '2': '至少二级',
        '3': '至少三级',
        '4': '至少四级',
        '5': '至少五级',
        '6': '至少六级',
        '7': '至少七级',
        '8': '至少八级',
        '9': '至少九级',
        '10': '至少十级',
        '11': '至少十一级',
        '12': '至少十二级',
        '13': '至少十三级',
        '14': '至少十四级',
        '15': '至少十五级',
        '16': '至少十六级',
        '17': '至少十七级',
        '18': '至少十八级',
        '19': '至少十九级',
        '20': '至少二十级',
        '21': '至少二十一级',
        '22': '至少二十二级',
        '23': '至少二十三级',
        '24': '至少二十四级',
        '25': '至少二十五级',
        '26': '至少二十六级',
        '27': '至少二十七级',
        '28': '至少二十八级',
        '29': '至少二十九级',
        '30': '至少三十级'
      },
      levelDataArr: []
    }
  },
  mounted() {
    this.levelDataArr = convertObjToArr(this.levelData)
    this.getLevlel()
  },
  methods: {
    getLevlel() {
      let self = this
      getLevel().then( res => {
        console.log('@@##@@', res)
        if (res.code === 200) {
          self.needGrade = self.levelData[res.data.needGrade]
        }
      })
    },
    onSubmit() {
      chatLevel(this.needGrade).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
    },
    reset() {
      this.needGrade = '0'
    }
  }
}
</script>

