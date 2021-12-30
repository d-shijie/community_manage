import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const Welcome = () => import('../views/home/children/Welcome.vue')
const UserList = () => import('../views/home/children/UserList.vue')
const EventList = () => import('../views/home/children/EventList.vue')
const AdminList = () => import('../views/home/children/AdminList.vue')
const AddUser = () => import('../views/home/children/AddUser.vue')
const AddEvent = () => import('../views/home/children/AddEvent.vue')
const Chart = () => import('../views/home/children/Chart.vue')
const CommandList = () => import('../views/home/children/CommandList.vue')
const Command = () => import('../views/home/children/Command.vue')
const Help = () => import('../views/home/children/Help.vue')
Vue.use(VueRouter)
const routes = [
  {
    redirect: '/login',
    path: ''
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        redirect: 'welcome',
        path: ''
      },
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'userList',
        component: UserList
      },
      {
        path: 'eventList',
        component: EventList
      },
      {
        path: 'adminList',
        component: AdminList
      },
      {
        path: 'addUser',
        component: AddUser
      },
      {
        path: 'addEvent',
        component: AddEvent
      },
      {
        path: 'chart',
        component: Chart
      },
      {
        path: 'commandList',
        component: CommandList
      },
      {
        path: 'command',
        component: Command
      },
      {
        path: 'help',
        component: Help
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
// router.beforeEach((to, from, next) => {
//   if (to.name = 'home' && window.sessionStorage.getItem('adminId')) {
//     next('/home')
//     next()
//   } else {
//     next('/login')
//   }
// })