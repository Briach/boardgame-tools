import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Countdown from '../views/Countdown.vue'
import NotFound from '../views/NotFound.vue'
import SimpleTimer from '../views/SimpleTimer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: "/count-up",
    name: "Count Up",
    component: SimpleTimer,
  },
  {
    path: "/countdown",
    name: "Countdown",
    component: Countdown,
  },
  {
    path: "/:catchAll(.*)",
    name: "Error 404",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
