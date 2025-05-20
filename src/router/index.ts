import {createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
// import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

const routes = [
  { path: "/", component: Home },
  { path: '/login', component: Login },
  // { path: '/sign-up', component: SignUp },
  {
    path: "/dashboard",
    components: {
      default: Dashboard,
      header: HeaderComponent,
    },
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
