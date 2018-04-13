<template>
  <div id="app">
    <div style="position: fixed; width: 100%; z-index: 9">
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
        <span class="logo">ACFUN</span>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
