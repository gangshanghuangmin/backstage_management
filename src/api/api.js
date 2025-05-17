// 整个项目api的统一管理
import requests from './request';
export default{
    //请求首页左侧的表格的数据
        getTableData(){
        return requests({
            //动态的mock地址
            url:"/home/getTableData",
            method:"get",
            // mock:true,
        });

    },

    //请求首页表格的数据
    getCountData(){
        return requests({
            url:"/home/getCountData",
            method:"get",
            // mock:true,
        });
    },

       //请求首页echarts的数据
    getChartData(){
        return requests({
            url:"/home/getChartData",
            method:"get",
            // mock:true,
        });
    },
    getUserData(data){
        return requests({
            url:"/user/getUserData",
            method:"get",
            // mock:true,
            data,
        });
    },

   deleteUser(data){
        return requests({
            url:"/user/deleteUser",
            method:"get",
            // mock:true,
            data,
        });
    },
    addUser(data){
        return requests({
            url:"/user/addUser",
            method:"post",
            // mock:true,
            data,
        });
    },
    
};