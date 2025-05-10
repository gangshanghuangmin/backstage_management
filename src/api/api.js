// 整个项目api的统一管理
import requests from './request';
export default{
    //请求首页左侧的表格的数据
        getTableData(){
        return requests({
            url:"/api/home/getTableData",
            method:"get",
        });

    },
};