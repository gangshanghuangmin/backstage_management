import { de } from 'element-plus/es/locales.mjs';
import Mock from 'mockjs'

//get请求从config获取参数  post从config.body获取参数
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}'
    );

}
let List = [];
const count = 200;
//模拟200条数据
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock(
            {
                id: Mock.Random.guid(),
                name: Mock.Random.cname(),
                addr: Mock.mock('@county(true)'),
                'age|18-60': 1,
                birth: Mock.Random.date(),
                sex: Mock.Random.integer(0, 1)
            }
        )
    )
}

export default {
    getUserList: config => {
        //limit默认10，因为分页器也是一页10个
        const { name, page = 1, limit = 10 } = param2Obj(config.url);
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1) return false
            return true;
        });
        //分页
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            code: 200,
            success: true,
            data: {
                list: pageList,
                count: mockList.length,//数据总条数需要返回
            }
        }
    },
    //删除
    deleteUser: config => {
        const { id } = param2Obj(config.url);
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 200,
                message: '删除成功'
            }
        }
    },

    //添加用户
    createUser: config => {
        const { username, birth, addr, information, position, sex } = JSON.parse(config.body);
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            birth: birth,
            addr: addr,
            information: information,
            position: position,
            sex: sex
        })
        return {
            code: 200,
            data: {
                message: '添加成功'
            }
        }
    }

};

