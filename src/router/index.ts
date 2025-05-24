import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import { useAuthStore } from "../stores/auth";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: SignUp },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { requiresAuth: true },
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

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    auth.logout();
    next({ name: "login" });
    return;
  }
  if ((to.name === "login" || to.name === "signup" || to.path === "/") && auth.isAuthenticated) {
    next({ name: "dashboard" });
    return;
  }
  next();
});

export default router;
