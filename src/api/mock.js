import Mock from 'mockjs';
import homeApi from './mockData/home';
//1.拦截的路径2.请求的方法3.返回的假数据
Mock.mock(/api\/home\/getTableData/, "get",homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, "get",homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get",homeApi.getChartData);

