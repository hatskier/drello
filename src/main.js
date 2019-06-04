import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMdl from 'vue-mdl'
import Mdl from 'material-design-lite'

import App from './App.vue'

import Projects from './components/views/Projects.vue'
import Tasks from './components/views/Tasks.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMdl)

Vue.directive('mdl', {
  inserted: el => Mdl.componentHandler.upgradeElement(el)
})

const routes = [
  { path: '/', component: Projects },
  { path: '/projects', component: Projects },
  { path: '/tasks', component: Tasks },
  { path: '/tasks/:project', component: Tasks },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default app
