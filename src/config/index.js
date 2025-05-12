import { mock } from "mockjs";
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
    //开发
    development: {
        baseApi: '/api',
        mockApi: 'http://127.0.0.1:4523/m1/6365903-6062094-default/api',
    },
    //测试
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'http://127.0.0.1:4523/m1/6365903-6062094-default/api',
    },
    prod: {
        baseApi: '//future.com/api',
        mockApi: 'http://127.0.0.1:4523/m1/6365903-6062094-default/api',
    },
};
//向外暴露
export default {
    env,//与环境开发相关
    ...EnvConfig[env],
    mock: false,
}