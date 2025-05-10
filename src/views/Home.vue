<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user" />
                    <div class="user-info">
                        <p class="user-info-admin">Admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>

                <div class="login-info">
                    <p>上次登录时间<span>2025-4-10</span></p>
                    <p>上次登录地点<span>杭州</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>


        </el-col>
    </el-row>
</template>

<script setup>
import { ref,getCurrentInstance,onMounted } from 'vue';


const {proxy} = getCurrentInstance();

const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
//数据：等会使用axios请求mock数据

const tableData = ref([
    {
        name: "玉兰花",
        todayBuy: 20,
        monthBuy: 500,
        totalBuy: 1006,
    },

])
const tableLabel = ref({
    name: "花名",
    todayBuy: "今日销售",
    monthBuy: "本月销售",
    totalBuy: "总销售",
})
const getTableDate=async () => {
    const data = await proxy.$api.getTableData();
    tableData.value = data.tableData;
    
}
onMounted(() => {
    getTableDate();
})



</script>

<style scoped lang="less">
.home {
    height: 100%;
    overflow: hidden;

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }

        .user-info {
            p {
                line-height: 10px;
            }

            .user-info-p {
                color: #999;
            }

            .user-info-admin {
                font-size: 35px;
            }
        }
    }

    .login-info {
        p {
            line-height: 15px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }
    .user-table{
        margin-top: 20px;
    }
}
</style>