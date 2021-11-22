import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/view/login/Login.vue'
import Home from '@/view/home/Home.vue'
import Welcome from '@/view/home/childComps/Welcome.vue'
import Users from '@/view/home/childComps/Users.vue'
import Rights from '@/view/home/childComps/power/Rights.vue';
import Roles from '../view/home/childComps/power/Roles.vue';


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: Welcome,
        }, {
            path: '/users',
            component: Users,
        }, {
            path: '/rights',
            component: Rights,
        }, {
            path: '/roles',
            component: Roles,
        }]
    }
]

const router = new VueRouter({
    routes
})

// 验证登录
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next()
})

export default router