<template>
  <div v-if="shFlag">
    <div tabindex="-1" class="el-message-box__wrapper" style="z-index: 2086;" @click.self="pclose">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">{{title}}</div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="pclose"><i class="el-message-box__close el-icon-close"></i></button>
        </div>
        <div class="el-message-box__content">
          <slot></slot>
        </div>
        <div class="el-message-box__btns">
            <button type="button" class="el-button el-button--default" style="" @click="cancelFun"><span>取消</span></button>
            <button type="button" class="el-button el-button--default el-button--primary" @click="sureFun"><span>确定</span></button>
        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 2000;" @click="pclose"></div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  data() {
    return {
      shFlag: this.isShow
    }
  },
  methods: {
    pclose(evt) {
      this.shFlag = false
    },
    cancelFun(evt) {
      this.$emit('click-cancel', evt)
    },
    sureFun(evt) {
      this.$emit('click-sure', evt)
    }
  },
  watch: {
    isShow(n) {
      this.shFlag = n
    },
    shFlag(n) {
      this.$emit('get-prompt-status', n)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-message-box__wrapper{
    z-index: 2015;
  }
</style>
