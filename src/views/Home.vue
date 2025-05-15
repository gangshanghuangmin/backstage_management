<template>
  <div>
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

            <el-card class="top-echart" style="height: 240px">
                <div ref="echart" style="height: 240px"></div>
            </el-card>
            <div class="graph" style="height: 220px">
                <el-card>
                    <div ref="userEchart" style="height: 200px"></div>
                </el-card>
                <el-card >
                    <div ref="videoEchart" style="height: 180px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { el } from 'element-plus/es/locales.mjs';
import { ref, getCurrentInstance, onMounted, reactive } from 'vue';
import *as echarts from 'echarts'
const { proxy } = getCurrentInstance();

const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
//数据：等会使用axios请求mock数据

const tableData = ref([])
const countData = ref([])
const chartData = ref([])
const observer = ref(null)



const tableLabel = ref({
    name: "花名",
    todayBuy: "今日销售",
    monthBuy: "本月销售",
    totalBuy: "总销售",
})



// 折线图和柱状图，两个图表共用的公共配置
const xoptions = reactive({
    textStyle: {
        color: "#333",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    //提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category",
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
    },

    axisLabel: {
        interval: 0,
        color: "#333",
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        }
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ablef", "#ffb980", "#8d98b3"],
    series: [],
});
//饼状图配置
const pieOptions = reactive({
    tooltip: {
        trigger: "item",
       formatter: "{b}: {d}%"   // 添加百分比显示
    },
    legend: {
    orient: 'horizontal',  // 水平排列
    right: 40,             // 靠右对齐
    top: '0',             // 顶部对齐
    textStyle: {          // 图例文本样式
        fontSize: 10,     // 设置字体大小（单位：px）
        color: '#666'     // 可选：设置字体颜色
    },
    itemWidth: 12,        // 可选：图例标记的宽度
    itemHeight: 12,       // 可选：图例标记的高度
    itemGap: 8            // 可选：图例之间的间距
},
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    // series: []
});






const getTableData = async () => {
    const data = await proxy.$api.getTableData();
    tableData.value = data.tableData;
}

const getCountData = async () => {
    const data = await proxy.$api.getCountData();
    countData.value = data;
}

const getChartData = async () => {
    const {orderData,userData,videoData} = await proxy.$api.getChartData();
    //对第一个图标进行x轴 和 series赋值
    xoptions.xAxis.data = orderData.date;
    xoptions.series = Object.keys(orderData.data[0]).map(val => ({
        name: val,
        data: orderData.data.map(item => item[val]),
        type: "line"
    }));
    //对第二个图标进行赋值
    const oneEchart = echarts.init(proxy.$refs['echart'])
    oneEchart.setOption(xoptions);

    //对第二个表格进行渲染
    xoptions.xAxis.data = userData.map(item => item.date)
    xoptions.series = [
        {
          name:"新增用户",
          data: userData.map(item => item.new),
          type: 'bar'
        },
        {
          name:"活跃用户",
          data: userData.map(item => item.active),
          type: 'bar'
        },
    ]
    const twoEchart = echarts.init(proxy.$refs['userEchart'])
    twoEchart.setOption(xoptions);

    //第三个饼状图进行渲染
    pieOptions.series = [
        {
            data:videoData,
            type: 'pie'
        }
    ]
    const threeEchart = echarts.init(proxy.$refs['videoEchart'])
    threeEchart.setOption( pieOptions);

    //监听页面变化：
    //如果监听的容器大小发生变化，改变了以后，回字执行回调函数
  observer.value = new ResizeObserver((en) => {
      oneEchart.resize();
      twoEchart.resize();
      threeEchart.resize();
  })
  //判断：容器是否存在
  if(proxy.$refs['echart']){
    observer.value.observe(proxy.$refs['echart'])
  }

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
        margin-top: 16px;
    }

    .num {
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

.top-echart{
     margin-top: 1px;

}
.graph{
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
    .el-card{
        margin-top: 20px;
        width: 48%;
    }
}

}
</style>