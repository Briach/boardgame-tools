import { createWebHistory, createRouter } from "vue-router";
import SimpleTimer from "./../components/SimpleTimer.vue";
import Countdown from "./../components/Countdown.vue";
import NotFound from "./../components/NotFound.vue";

const routes = [
  {
    path: "",
    name: "Simple Timer",
    component: SimpleTimer,
  },
  {
    path: "/",
    name: "Simple Timer",
    component: SimpleTimer,
  },
  {
    path: "/simple-timer",
    name: "Simple Timer",
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;