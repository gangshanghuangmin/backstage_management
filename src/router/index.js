import { pa } from "element-plus/es/locales.mjs";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children: [
            {
                path: "home",
                name: 'home',
                //路径的匹配
                component: () => import('@/views/Home.vue'),
            },
              {
                path: "user",
                name: 'user',
                //路径的匹配
                component: () => import('@/views/User.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;