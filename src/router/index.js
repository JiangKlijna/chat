import Vue from 'vue'
import Router from 'vue-router'
import Message from '@/components/Message'
import Theme from '@/components/Theme'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import Person from '@/components/Person'
import Search from '@/components/Search'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Message', component: Message},
        {path: '/theme', name: 'Theme', component: Theme},
        {path: '/login', name: 'Login', component: Login},
        {path: '/regist', name: 'Regist', component: Regist},
        {path: '/person', name: 'Person', component: Person},
        {path: '/search', name: 'Search', component: Search},
        {path: '/chat/:userid', name: 'Chat', component: Chat},
    ]
})
