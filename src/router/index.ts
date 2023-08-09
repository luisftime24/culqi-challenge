import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import { useSessionStore } from '../store/session';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore();

  if (to.meta.requiresAuth && !sessionStore.isLoggedIn) {
    next('/auth');
  }
  else if (to.meta.requiresGuest && sessionStore.isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router
