<template>
    <el-aside :width="width" class="fade-width aside-container">
        <el-menu background-color="#545c64" text-color="#fff" :collapse="isCollapse">
            <div class="logo-text fade-width">
                {{ isCollapse ? '花木城' : '花圃后台管理系统' }}
            </div>
            <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>

            <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(subItem, subIndex) in item.children" :index="subItem.path"
                        :key="subItem.path">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

        </el-menu>
    </el-aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { House } from '@element-plus/icons-vue'
import { useAllDataStore } from '@/stores'


const list = ref([
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'house',
        url: 'Home'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'Mall'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'User'
    },
    {
        path: '/order',
        name: 'order',
        label: '订单管理',
        icon: 'notebook',
        url: 'Order'
    },
    {
        path: '/recycle',
        name: 'recycle',
        label: '回收站',
        icon: 'trash',
        url: 'Recycle'
    },
    {
        path: '/other',
        label: '其他',
        icon: 'location',
        children: [

            {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'Page1'
            },
            {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'Page2'
            }
        ]
    }
])

//左侧导航栏菜单
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))
//pinia设计导航栏收缩
const store = useAllDataStore()//调用一下
const isCollapse = computed(() => store.state.isCollapse)

//设置动态宽度：width
const width = computed(() => isCollapse.value ? '64px' : '180px')

</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

//取消格子线
.el-menu {
    border-right: none;

    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}

.el-aside {
    height: 100%;
    background-color: #545c64;
}

.aside-container {
    transition: width 0.3s ease;
    min-height: 100vh;
}
.logo-text {
  text-align: center;
  font-weight: bold;
  color: #fff;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.3s ease;
}
.fade-width {
  transition: width 0.3s ease;
}
.fade-opacity {
  transition: opacity 0.3s ease;
}
</style>
