<template>
    <div class="tags">
        <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'"
            :effect="route.name === tag.name ? 'dark' : 'plain'" @click="handleMenu(tag)"
            @close="handleClose(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed, effect, ref } from 'vue';
import { useAllDataStore } from '@/stores';

const store = useAllDataStore();
const tags = computed(() => store.state.tags);
const router = useRouter()
const route = useRoute()

const handleMenu = (tag) => {
    router.push(tag.name)
    store.selectMenu(tag)
}


const handleClose = (tag, index) => {
    //删除tag
    store.undateTags(tag)
    //如果点击的关闭的tag是不是现在的页面
    if (tag.name !== route.name) return
    if (index === store.state.tags.length) {
        store.selectMenu(tags.value[index - 1])
        router.push(tags.value[index - 1].name)
    } else {
        store.selectMenu(tags.value[index])
        router.push(tags.value[index].name)
    }
}



</script>
<style lang="less" scoped>
.tags {
    margin: 20px 0 0 20px;
}

.el-tag {
    margin-right: 10px;
}
</style>