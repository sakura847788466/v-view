import Vue from 'vue'
import Router from 'vue-router'

const PageOne = () =>
  import('./views/PageOne/PageOne.vue')
const Homet = () =>
  import('./views/Homet/Homet.vue')
const Test = () =>
  import('./views/Test/Test.vue')
const ImgRote = () =>
  import('./views/ImgRote/ImgRote.vue')

Vue.use(Router)
const routes = [{
  path: '/',
  redirect: '/PageOne'
},
{
  path: '/PageOne',
  name: 'PageOne',
  component: PageOne
},
{
  path: '/homet:num',
  name: 'homet',
  component: Homet
},
{
  path: '/test',
  name: 'test',
  component: Test
}, {
  path: '/imgRote',
  name: 'imgRote',
  component: ImgRote
},
]
export default new Router({
  mode: 'history',
  routes
})