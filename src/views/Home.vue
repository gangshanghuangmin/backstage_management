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
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component :is="item.icon" class="icons" :style="{ background: item.color }">
                    </component>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">￥{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { el } from 'element-plus/es/locales.mjs';
import { ref, getCurrentInstance, onMounted } from 'vue';


const { proxy } = getCurrentInstance();

const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
//数据：等会使用axios请求mock数据

const tableData = ref([])
const countData = ref([])
const chartData = ref({})



const tableLabel = ref({
    name: "花名",
    todayBuy: "今日销售",
    monthBuy: "本月销售",
    totalBuy: "总销售",
})
const getTableData = async () => {
    const data = await proxy.$api.getTableData();
    tableData.value = data.tableData;
}

const getCountData = async () => {
    const data = await proxy.$api.getCountData();
    countData.value = data;
}

const getChartData = async () => {
    const data = await proxy.$api.getChartData();
    console.log(data);
    chartData.value = data;
}




onMounted(() => {
    getTableData()
    getCountData()
    getChartData()
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

    .user-table {
        margin-top: 20px;
    }

.num {
        // height: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            height: 60px;
            width: 32%;
            margin-bottom: 20px;

            .icons {
                height: 100%;
                width: 60px;
                font-size: 30px;
                text-align: center;
                line-height: 40px;
                color: #fff;
            }

            .detail {
                margin-left: 1px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .num {
                    margin-left: 10px;
                    font-size: 25px;
                    line-height: 15px;
                    margin-top: 6px;
                }

                .txt {
                    margin-left: 10px;
                    font-size: 15px;
                    line-height: 0;
                    margin-top: 0;
                    text-align: center;
                    color: #999;
                }
            }
        }


    }
}
</style>