<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
</script>

<template>
 
    <div class="common-layout">
        <el-container class="lay-container">
            <common-aside />
            <el-container>
                <el-header class="el-header">
                    <common-header />
                </el-header>
                <el-main class="right-main">
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout {
  height: 100%;
  // 添加以下代码确保弹性布局
  .lay-container {
    height: 100%;
    display: flex; // 启用 flex 布局
    > .el-container { // 嵌套的 el-container 填充剩余空间
      flex: 1;
      flex-direction: column; // 纵向排列
      .el-main {
        flex: 1;
      }
    }
  }
}
.el-header {
    background-color: #333;
}
</style>
