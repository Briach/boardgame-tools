import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

import Countdown from '../views/timers/Countdown.vue'
import SimpleTimer from '../views/timers/SimpleTimer.vue'

import CountPoints from '../views/sheets/CountPoints.vue'
import CountWins from '../views/sheets/CountWins.vue'


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
    path: "/:catchAll(.*)",
    name: "Error 404",
    component: NotFound,
  },

  {
    path: "/timers/count-up",
    name: "Count Up",
    component: SimpleTimer,
  },
  {
    path: "/timers/countdown",
    name: "Countdown",
    component: Countdown,
  },

  {
    path: "/sheets/countpoints",
    name: "Count Points",
    component: CountPoints,
  },
  {
    path: "/sheets/countwins",
    name: "Count Wins",
    component: CountWins,
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
