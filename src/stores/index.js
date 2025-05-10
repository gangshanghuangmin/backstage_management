import { defineStore } from 'pinia';
import { ref } from 'vue';
function initState(){
    return {
        isCollapse: true,
    };
}//定义函数
export const useAllDataStore = defineStore('allData', () => {
    //ref state属性
    //computed getter属性
    //function action 方法
    const state = ref(initState());
    return {
      state,
    };
  });