import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ( /*webpackChunkName: "Login_Home_Welcome" */ "@/view/login/Login.vue")
const Home = () =>
    import ( /*webpackChunkName: "Login_Home_Welcome" */ "@/view/home/Home.vue")
const Welcome = () =>
    import ( /*webpackChunkName: "Login_Home_Welcome" */ "@/view/home/childComps/Welcome.vue")
    // import Login from '@/view/login/Login.vue'
    // import Home from '@/view/home/Home.vue'
    // import Welcome from '@/view/home/childComps/Welcome.vue'
const Users = () =>
    import ( /*webpackChunkName: "Users_Rights_Roles" */ "@/view/home/childComps/Users.vue")
const Rights = () =>
    import ( /*webpackChunkName: "Users_Rights_Roles" */ "@/view/home/childComps/power/Rights.vue")
const Roles = () =>
    import ( /*webpackChunkName: "Users_Rights_Roles" */ "@/view/home/childComps/power/Roles.vue")
    // import Users from '@/view/home/childComps/Users.vue'
    // import Rights from '@/view/home/childComps/power/Rights.vue';
    // import Roles from '@/view/home/childComps/power/Roles.vue';
const Cate = () =>
    import ( /*webpackChunkName: "Cate_params_GoodsList_Add" */ "@/view/home/childComps/goods/Cate.vue")
const params = () =>
    import ( /*webpackChunkName: "Cate_params_GoodsList_Add" */ "@/view/home/childComps/goods/params.vue")
const GoodsList = () =>
    import ( /*webpackChunkName: "Cate_params_GoodsList_Add" */ "@/view/home/childComps/goods/List.vue")
const Add = () =>
    import ( /*webpackChunkName: "Cate_params_GoodsList_Add" */ "@/view/home/childComps/goods/Add.vue")
    // import Cate from '@/view/home/childComps/goods/Cate.vue'
    // import params from '@/view/home/childComps/goods/params.vue';
    // import GoodsList from '@/view/home/childComps/goods/List.vue'
    // import Add from '@/view/home/childComps/goods/Add.vue'
const Order = () =>
    import ( /*webpackChunkName: "Order" */ "@/view/home/childComps/order/Order.vue")
    // import Order from '@/view/home/childComps/order/Order.vue'
const Report = () =>
    import ( /*webpackChunkName: "Report    " */ "@/view/home/childComps/report/Report.vue")
    // import Report from '@/view/home/childComps/report/Report.vue'


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
        }, {
            path: '/categories',
            component: Cate,
        }, {
            path: '/params',
            component: params,
        }, {
            path: '/goods',
            component: GoodsList,
        }, {
            path: '/goods/add',
            component: Add,
        }, {
            path: '/orders',
            component: Order,
        }, {
            path: '/reports',
            component: Report,
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