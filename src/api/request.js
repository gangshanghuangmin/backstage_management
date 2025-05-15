import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config';
const service = axios.create({
    baseURL: config.baseApi,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

service.interceptors.response.use(
    (res) => {
        if (!res || !res.data) {
            const NETWORK_ERROR = '响应数据格式异常'
            ElMessage.error(NETWORK_ERROR)
            return Promise.reject(NETWORK_ERROR)
        }
        
        // 忽略代理服务器可能添加的success字段
       const { code, data, msg, success } = res.data
        
        // 只检查code字段
        if (code === 200 && (success === undefined || success === true)) {  // 与后端定义的success code一致
            return data
        } else {
            const errorMsg = msg || `请求处理失败 (code: ${code})`
            ElMessage.error(errorMsg)
            return Promise.reject(errorMsg)
        }
    },
    (error) => {
        // 错误处理保持不变
        const errorMsg = error.response?.data?.msg || 
                       error.message || 
                       '网络请求异常，请稍后重试'
        ElMessage.error(errorMsg)
        return Promise.reject(error)
    }
)

function request(options) {
    options.method = options.method || 'get';
    //关于get请求参数的调整：
    if (options.method.toLowerCase() === "get") {
        //判断数据是否是data类型
        options.params = options.data;
    }
    //对mock的开关做一个处理：
    let isMock = config.mock;
    if (typeof options.mock !== "undefined") {
        isMock = options.mock;
    }
    //针对环境处理：如果是线上，就不用mock的环境（因为mock是假环境）
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
}
export default request;