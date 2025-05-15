<script setup>

import { ref, getCurrentInstance, onMounted, reactive } from 'vue'

const handleClick = () => {
    console.log('click')
}

const tableData = ref([])

//调用getCurrentInstance()方法
const { proxy } = getCurrentInstance()

const getUserData = async () => {

    let data = await proxy.$api.getUserData(config);
    tableData.value = data.list.map(item => ({
        ...item,
        sexLabel: item.sex === 1 ? '男' : '女'
    }));//动态获取mock数据


}

const tableLabel = reactive([

    { prop: 'name', label: '姓名' },
    { prop: 'birth', label: '出生日期' },
    { prop: 'addr', label: '地址', width: 400 },
    { prop: 'information', label: '联系方式', width: 200 },
    { prop: 'position', label: '职位', width: 200 },
    { prop: 'sexLabel', label: '性别' },


])

const formInline = reactive({
    keyWord: ''
})

const config = reactive({
    name: ''
})

const handleSearch = () => {
    config.name = formInline.keyWord;
    getUserData()
}


//回调函数调用api方法
onMounted(() => {
    getUserData();
})


</script>

<template>
    <div class="user-header">
        <el-button type="primary">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
            </el-form-item> 

            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :width="item.width ? item.width : 125"
                :prop="item.prop" :label="item.label" />
            <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default>
                    <el-button type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
</template>

<style scoped lang="less">
.user-header {
    display: flex;
    justify-content: space-between;
}
</style>