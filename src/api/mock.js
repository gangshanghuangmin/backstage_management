import Mock from 'mockjs';
import homeApi from './mockData/home';
import userApi from './mockData/user';
//1.拦截的路径2.请求的方法3.返回的假数据
Mock.mock(/api\/home\/getTableData/, "get",homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, "get",homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get",homeApi.getChartData);
Mock.mock(/api\/home\/getUserData/, "get",userApi.getUserData);
Mock.mock(/api\/user\/deleteUser/, "get",userApi.deleteUser);
Mock.mock(/api\/user\/addUser/, "post",userApi.createUser);


