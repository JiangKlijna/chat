import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Theme from '@/components/Theme'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Hello', component: Hello},
        {path: '/theme', name: 'Theme', component: Theme},
    ]
})
