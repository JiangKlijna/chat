import Vue from 'vue'
import Router from 'vue-router'
import Message from '@/components/Message'
import Theme from '@/components/Theme'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Message', component: Message},
        {path: '/theme', name: 'Theme', component: Theme},
        {path: '/login', name: 'Login', component: Login},
    ]
})
