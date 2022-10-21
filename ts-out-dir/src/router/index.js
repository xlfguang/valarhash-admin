import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout';
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/banner',
        children: [
            {
                path: 'banner',
                name: 'banner',
                component: () => import('@/views/banner/index.vue'),
                meta: { title: 'banner管理', elSvgIcon: 'Fold' }
            }
        ]
    },
    {
        path: '/news',
        component: Layout,
        redirect: '/news/info',
        name: 'News',
        meta: { title: '新闻', icon: 'example' },
        children: [
            {
                path: 'info',
                name: 'info',
                component: () => import('@/views/news/index.vue'),
                meta: { title: '新闻管理', icon: 'table' }
            }
        ]
    }
];
export const asyncRoutes = [];
const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
});
export default router;
//# sourceMappingURL=index.js.map