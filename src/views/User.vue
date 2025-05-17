<script setup>
import { id, ta } from 'element-plus/es/locales.mjs'
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const handleClick = () => {
    console.log('click')
}

const tableData = ref([])
const { proxy } = getCurrentInstance()
const getUserData = async () => {
    let data = await proxy.$api.getUserData(config)
    console.log(data)
    tableData.value = data.list.map(item => ({
        ...item,
        sexLabel: item.sex === 1 ? '男' : '女'
    }))
    config.total = data.count
}

const tableLabel = reactive([
    { prop: 'name', label: '姓名' },
    { prop: 'addr', label: '地址', width: 400 },
    { prop: 'birth', label: '出生日期', width: 200 },
    { prop: 'information', label: '联系电话', width: 200 },
    { prop: 'position', label: '职位', width: 200 },
    { prop: 'sexLabel', label: '性别' }
])

const formInline = reactive({
    keyWord: ''
})
const config = reactive({
    name: '',
    total: 0,
    page: 0
})

const handleSearch = () => {
    config.name = formInline.keyWord
    getUserData()
}
const hanldeChange = (page) => {
    config.page = page
    getUserData()
}
//删除
const handleDelete = (val) => {
    ElMessageBox.confirm("你确定要删除吗？").then(async () => {
        proxy.$api.deleteUser({ id: val.id })
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
        })
        getUserData()
    })
}

//添加设置
const action = ref('add')
const dialogVisible = ref(false)
const formUser = reactive({
    name: '',
    sex: '',
    birth: '',
    information: '',
    addr: '',
    position: ''
})
const rules = reactive({
    name: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    birth: [
        {
            required: true,
            message: '请输入出生日期',
            trigger: 'blur'
        }
    ],
    information: [
        {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
        }
    ],
    addr: [
        {
            required: true,
            message: '请输入地址',
        }
    ],
    position: [
        {
            required: true,
            message: '请输入职位',
        }
    ]
})

const handleClose = () => {
    //获取表单重置表单
    dialogVisible.value = false;
}
//对话框取消
const handleCancel = () => {
    dialogVisible.value = false
}

const handleAdd = () => {
    dialogVisible.value = true
    action.value = 'add'
}
const timeFormat = (time) => {
    var time = new Date(time)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    function add(m) {
        return m < 10 ? '0' + m : m
    }
    return year + "-" + add(month) + "-" + add(day)
}
const onSubmit = () => {
    proxy.$refs['userForm'].validate(async (vaild) => {
        if (vaild) {
            let res = null;
            formUser.birth = /^\d{4}-\d{2}-\d{2}/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth)
            if (action.value === 'add') {
                res = await proxy.$api.addUser(formUser)

            }
            if (res) {
                dialogVisible.value = false
                proxy.$refs['userForm'].resetFields()
                getUserData()
            } else {
                ElMessage({
                    showClose: true,
                    message: '请输入正确的内容',
                    type: 'error'
                })

            }
        }
    })
}

onMounted(() => {
    getUserData()
})
</script>
<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :width="item.width ? item.width : 125"
                :prop="item.prop" :label="item.label" />
            <el-table-column fixed="right" label="Operations" min-width="120">
                <template #="scope">
                    <el-button type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-button type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-pagination class="pager" background layout="prev, pager, next" size="small" :total="config.total"
        @current-change="hanldeChange" />
    <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="35%"
        :before-close="handleClose">
        <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth">
                        <el-input v-model="formUser.birth" placeholder="请输入出生日期" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item class="select-clearn" label="性别" prop="sex">
                        <el-select v-model="formUser.sex" placeholder="请选择">
                            <el-option label="男" value="1" />
                            <el-option label="女" value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="information">
                        <el-input v-model="formUser.information" placeholder="请输入手机号" />
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="地址" prop="addr">
                        <el-input v-model="formUser.addr" placeholder="请输入地址" />
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="职位" prop="position">
                        <el-input v-model="formUser.position" placeholder="请输入职位" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-row style="justify-content: flex-end">
                    <el-form-item>
                        <el-button type="primary" @click="handleCancel">取消</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-row>
            </el-row>
        </el-form>
    </el-dialog>
</template>
<style scoped>
.user-header {
    display: flex;
    justify-content: space-between;
}

.table {
    position: relative;

    .pager {
        position: absolute;
        right: 10px;
        bottom: 30px;
    }

    .el-table {
        width: 100%;


    }

    .select-clearn {
        display: flex;
    }
}
</style>